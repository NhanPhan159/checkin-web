import { Button } from "@/components/ui/button";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QRPayment() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onScan = (result: IDetectedBarcode[]) => {
    const encode = result[0];
    if (encode.format === "qr_code" && !!encode.rawValue)
      setScanResult(encode.rawValue);
  };
  //

  return (
    <>
      {scanResult ? (
        <div>{scanResult}</div>
      ) : (
        <div>
          <Scanner
            onScan={onScan}
            onError={(error) => setError(JSON.stringify(error))}
          />
          <div className="w-full flex items-center justify-center">
            <Button className="mt-3" onClick={() => navigate("/")}>
              <ArrowLeft />
              Back
            </Button>
          </div>
          {error}
        </div>
      )}
    </>
  );
}

export default QRPayment;
