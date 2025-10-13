import * as XLSX from "xlsx";
//@ts-expect-error:"expected import"
import { saveAs } from "file-saver";
import { TUser } from "@/type";
import { FC } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

type TProps = {
  data: TUser[];
  fileName: string;
};
const ExportExcelButton: FC<TProps> = (props) => {
  const handleExport = () => {
    const filterData = props.data.map(({ qr, ...rest }) => rest);
    const formattedData = filterData.map(({ id, FullName, CompanyName, qrLink }) => ({
      "User ID": id,
      "Full Name": FullName,
      "Company Name": CompanyName,
      "QR Image Link": qrLink,
    }));
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, props.fileName);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={!(props.data.length > 0)}
      variant={"default"}
    >
      <Download /> Xuất file
    </Button>
  );
};

export default ExportExcelButton;
