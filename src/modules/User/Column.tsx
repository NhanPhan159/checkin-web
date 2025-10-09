import { TUser } from "@/type";
import { createColumnHelper } from "@tanstack/react-table";
import StatusTag from "../../components/customs/Tag";

const columnHelper = createColumnHelper<TUser>();
const columns = [
  columnHelper.accessor("name", {
    header: "User name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: "status",
    cell: (info) => <StatusTag text={info.renderValue()} />,
  }),
  columnHelper.accessor("qrLink", {
    header: "QR Link",
    cell: (info) => (
      <img className="w-20 h-20" src={info.renderValue() || ""} />
    ),
  }),
];

export default columns;
