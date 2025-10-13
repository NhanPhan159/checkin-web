import { TUser } from "@/type";
import { createColumnHelper } from "@tanstack/react-table";
// import StatusTag from "../../components/customs/Tag";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<TUser>();
const columns = [
  columnHelper.accessor("FullName", {
    header: "Họ và tên",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("CompanyName", {
    header: "Đơn vị công ty",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("qr", {
    header: "QR",
    cell: (info) => (
      <div className="w-full flex justify-center">
        <img className="w-20 h-20" src={info.renderValue() || ""} />
      </div>
    ),
  }),
  columnHelper.accessor("qrLink", {
    header: "QR Link",
    cell: (info) => {
      const handlerCopy = async (text: string) => {
        try {
          if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
          }
          toast.success("Link copied!");
        } catch (err) {
          console.error("Copy failed", err);
          toast.error("Copy failed");
        }
      };
      return (
        <div className="max-w-[200px] text-wrap flex gap-2 m-auto">
          {info.renderValue() || ""}
          <Button
            onClick={() => handlerCopy(info.renderValue() || "")}
            style={{ background: "#E5E4E2" }}
            size={"icon"}
          >
            <Copy />
          </Button>
        </div>
      );
    },
  }),
];

export default columns;
