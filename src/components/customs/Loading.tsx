import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const Loading = () => {
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="absolute h-full w-full top-0 bottom-0 bg-[#0f0e0e1a] flex items-center justify-center">
      {/* <Progress value={progress} className="w-[60%]" /> */}
      Loading
    </div>
  );
};

export default Loading;
