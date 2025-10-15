import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center bg-[url('/tomko.png')] bg-cover bg-center bg-no-repeat items-center h-screen w-screen bg">
      <div className="flex flex-col gap-2 mt-9">
        <Button
          onClick={() => navigate("/calendar")}
          variant={"outline"}
          className="p-8 rounded-xl"
        >
          <span className="text-3xl font-semibold">Lịch trình sự kiện</span>
        </Button>
        <Button
          onClick={() => navigate("/seatmap")}
          variant={"outline"}
          className="p-8 rounded-xl"
        >
          <span className="text-3xl font-semibold">
            Sơ đồ gian hàng sự kiện
          </span>
        </Button>
        <Button
          onClick={() => navigate("/check-list")}
          className="p-8 rounded-xl"
          variant={"outline"}
        >
          <span className="text-3xl font-semibold">Check list meeting</span>
        </Button>
      </div>
    </div>
  );
};
export default Event;
