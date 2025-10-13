import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-2">
        <Button onClick={() => navigate("/calendar")} variant={"outline"}>
          Calendar
        </Button>
        <Button onClick={() => navigate("/seatmap")} variant={"outline"}>
          Seat map
        </Button>
        <Button onClick={() => navigate("/check-list")} variant={"outline"}>
          Check list
        </Button>
      </div>
    </div>
  );
};
export default Event;
