import "./index.css";

import { Input } from "./components/ui/input";
import readXlsxFile from "read-excel-file";
import firebaseHelper from "./lib/firebase/FirebaseDB";
// @ts-expect-error: import error
import QRCode from "qrcode";
import { TUser } from "./type";
import { columns, Table, columnHelper } from "./modules/User";
import useGlobalStore from "./store";
import { onSnapshot } from "firebase/firestore";
import { Button } from "./components/ui/button";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ExportExcelButton from "./components/customs/ExcelExportBtn";
import toast from "react-hot-toast";
import supabaseClientInstance from "./lib/firebase/SupaStorage";
import { status } from "./constants";
import { Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Utils from "./utils";
import ManageField from "./modules/ManageField";
import { Schema } from "read-excel-file";

export default function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setLoading } = useGlobalStore((state) => state);
  const { users, fetchUsers, fetchTableFields, tableFields } = useGlobalStore(
    (state) => state,
  );
  const [columnTable, setColumnTable] = useState<typeof columns>();
  const [schemaExcel, setSchemaExcel] =
    useState<Schema<Record<string, object>>>();
  const navigator = useNavigate();
  const postBunchUsers = async (data: TUser[]) => {
    await firebaseHelper.addBunchUsers(data);
  };
  const handleUploadExcel = async (data: Record<string, string>[]) => {
    if (data.length === 0) {
      toast.error("File không được hỗ trợ, hãy kiểm tra lại cấu trúc file");
      return;
    }
    data = data.map((curr) => ({ ...curr, id: uuidv4() }));
    const userNoExist = await firebaseHelper.userNoExist(data as TUser[]);
    if (userNoExist.length) {
      setLoading(true);
      for (let i = 0; i < userNoExist.length; i++) {
        const encode = userNoExist[i].id;
        const canvas = await QRCode.toCanvas(
          // `${BASE_URL}/users/${userNoExist[i].id}`,
          // "https://www.aiaivn.com/vi",
          encode,
          { width: 500 },
        );
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        const urlImg = await supabaseClientInstance.uploadImage(
          blob as Blob,
          userNoExist[i].id,
        );
        if (urlImg) {
          userNoExist[i].qr = urlImg;
          userNoExist[i].qrLink = urlImg;
          userNoExist[i].status = status.NON_CHECK_IN;
          userNoExist[i].avatar = Utils.getRamdonAvatarIndex().toString();
        }
      }
      await postBunchUsers(userNoExist);
      await fetchUsers();
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchResoure = async () => {
      setLoading(true);
      await fetchTableFields();
      setLoading(false);
    };
    fetchResoure();
  }, []);

  useEffect(() => {
    if (tableFields) {
      const columnsResult: typeof columns = tableFields.map((tableField) => {
        const column = columnHelper.accessor(tableField.prop, {
          header: tableField.excelColumnName,
          cell: (info) => info.getValue(),
        });
        return column;
      });
      setColumnTable([...columnsResult, ...columns]);
      const schemaExcelResult = tableFields.reduce(
        (result: Schema, tableField) => {
          result[tableField.excelColumnName] = {
            prop: tableField.prop,
            type: String,
            required: tableField.require,
          };
          return result;
        },
        {},
      );
      setSchemaExcel(schemaExcelResult);
      (async () => {
        setLoading(true);
        onSnapshot(firebaseHelper.queryValue, async () => {
          setLoading(true);
          await fetchUsers();
          setLoading(false);
        });
      })();
    }
  }, [setLoading, fetchUsers, tableFields]);
  return (
    <div className="grid grid-cols-1 gap-y-10 m-5">
      <div className="flex gap-8 items-center">
        <div>
          {schemaExcel && (
            <Input
              type="file"
              accept=".xlsx"
              ref={fileRef}
              onChange={(e) =>
                e.target.files &&
                readXlsxFile(e.target?.files[0], {
                  schema: schemaExcel,
                }).then(async ({ rows }) => {
                  // @ts-expect-error:"expect row type"
                  await handleUploadExcel(rows);
                })
              }
              className="w-56 hidden"
            />
          )}
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
        <Button variant={"default"} onClick={() => navigator("/scan-qr")}>
          <Scan />
          Check-in by QR
        </Button>
        <ManageField />
        {/* <AddUserDialog /> */}
      </div>
      {columnTable && <Table data={users} columns={columnTable} />}
    </div>
  );
}
