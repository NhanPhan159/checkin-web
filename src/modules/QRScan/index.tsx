import { Button } from "@/components/ui/button";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QRPayment() {
  const navigate = useNavigate();
  const onScan = (result: IDetectedBarcode[]) => {
    const encode = result[0];
    if (encode.format === "qr_code" && !!encode.rawValue)
      console.log(encode.rawValue);
  };
  return (
    <>
      <Scanner onScan={onScan} onError={(error) => console.log(error)} />
      <div className="w-full flex items-center justify-center">
        <Button className="mt-3" onClick={() => navigate("/")}>
          <ArrowLeft />
          Back
        </Button>
      </div>
    </>
  );
}

export default QRPayment;
