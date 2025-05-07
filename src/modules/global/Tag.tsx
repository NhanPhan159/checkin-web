import {status} from "@/constants";
import {FC} from "react";

const statusColorMapping:Record<status,string> = {
  [status.CHECK_IN] : "bg-green-200 text-green-500",
  [status.NON_CHECK_IN] : "bg-blue-300 text-blue-500"
}

const StatusTag:FC<{text:status|null}> = (props) => {
  let style = ""
  if(props.text){
    style = statusColorMapping[props.text] + " w-fit py-2 px-4 rounded-xl"
  }
  return ( 
    <div className="w-full h-full flex justify-center">
      <div className={style}>{props.text}</div>
    </div>
   );
}
 
export default StatusTag;