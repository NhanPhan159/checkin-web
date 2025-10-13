import "./index.css";

import { Input } from "./components/ui/input";
import readXlsxFile from "read-excel-file";
import firebaseHelper from "./lib/firebase/FirebaseDB";
// import AddUserDialog from "./components/customs/AddUserDialog";
import firebaseStorage from "./lib/firebase/FirebaseStorage";
// @ts-expect-error: import error
import QRCode from "qrcode";
import { TUser } from "./type";
import { columns, Table } from "./modules/User";
import useGlobalStore from "./store";
// import { BASE_URL, status } from "./constants";
import { onSnapshot } from "firebase/firestore";
import { Button } from "./components/ui/button";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ExportExcelButton from "./components/customs/ExcelExportBtn";
import toast from "react-hot-toast";
const schemaExcel = {
  FullName: {
    prop: "FullName",
    type: String,
    required: true,
    column: "FullName",
  },
  CompanyName: {
    prop: "CompanyName",
    column: "CompanyName",
    type: String,
    required: true,
  },
};

export default function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setLoading } = useGlobalStore((state) => state);
  const { users, fetchUsers } = useGlobalStore((state) => state);
  const postBunchUsers = async (data: TUser[]) => {
    await firebaseHelper.addBunchUsers(data);
  };
  const handleUploadExcel = async (data: Record<string,string>[]) => {
    if (data.length === 0) {
      toast.error("File không được hỗ trợ, hãy kiểm tra lại cấu trúc file");
      return;
    }
    data = data.map((curr) => ({ ...curr, id: uuidv4() }));
    const userNoExist = await firebaseHelper.userNoExist(data as TUser[]);
    if (userNoExist.length) {
      setLoading(true);
      for (let i = 0; i < userNoExist.length; i++) {
        const encode = btoa(JSON.stringify(userNoExist[i]));
        console.log(encode)
        const canvas = await QRCode.toCanvas(
          // `${BASE_URL}/users/${userNoExist[i].id}`,
          // "https://www.aiaivn.com/vi",
          encode,
          { width: 500 }
        );
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        const urlImg = await firebaseStorage.getImgUrlFromFb(
          blob as Blob,
          userNoExist[i].id
        );
        userNoExist[i].qr = urlImg;
        userNoExist[i].qrLink = urlImg;
        // userNoExist[i].status = status.NON_CHECK_IN;
      }
      await postBunchUsers(userNoExist);
      await fetchUsers();
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchUsers();
      onSnapshot(firebaseHelper.queryValue, async () => {
        setLoading(true);
        await fetchUsers();
        setLoading(false);
      });
      setLoading(false);
    })();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-y-10 m-5">
      <div className="flex gap-8 items-center">
        <div>
          <Input
            type="file"
            accept=".xlsx"
            ref={fileRef}
            onChange={(e) =>
              e.target.files &&
              readXlsxFile(e.target?.files[0], { schema: schemaExcel }).then(
                async ({ rows }) => {
                  // @ts-expect-error:"expect row type"
                  await handleUploadExcel(rows);
                }
              )
            }
            className="w-56 hidden"
          />
          <Button variant={"default"} onClick={() => fileRef.current?.click()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
            Tải file lên
          </Button>
        </div>
        <ExportExcelButton data={users} fileName="UserInformation.xlsx" />
        {/* <AddUserDialog /> */}
      </div>
      <Table data={users} columns={columns} />
    </div>
  );
}
