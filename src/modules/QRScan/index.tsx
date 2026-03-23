import { Button } from "@/components/ui/button";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScanResult from "./ScanResult";
import firebaseHelper from "@/lib/firebase/FirebaseDB";
import { TUser } from "@/type";
import { status } from "@/constants";

function QRPayment() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<TUser | null>({
    CompanyName: "Abc",
    status: status.NON_CHECK_IN,
    FullName: "abc",
    email: "a@gmail.cpm",
    qr: "abc",
    qrLink: "abc",
    id: "123",
    avatar: "1",
    sex: "male",
    phone: "0909112233",
  });
  const [error, setError] = useState<string | null>(null);
  const onScan = async (result: IDetectedBarcode[]) => {
    const encode = result[0];
    if (encode.format === "qr_code" && !!encode.rawValue) {
      const userID = encode.rawValue;
      const data = await firebaseHelper.getUserById(userID);
      setScanResult(data);
    }
  };

  return (
    <>
      {scanResult ? (
        <>
          <ScanResult result={scanResult} />
        </>
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
