import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const Loading = () => {
  return (
    <div className="absolute h-full w-full top-0 bottom-0 bg-[#0500006f] flex items-center justify-center">
      <Button variant="outline" disabled size="lg">
        <Spinner />
        Đang tải xin chờ
      </Button>
    </div>
  );
};

export default Loading;
