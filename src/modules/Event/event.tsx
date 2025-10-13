import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Event = () =>{
    const navigate = useNavigate()
    return(
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col gap-2">
                <Button onClick={()=>navigate("/calendar")}>Calendar</Button>
                <Button onClick={()=>navigate("/seatmap")}>Seat map</Button>
                <Button onClick={()=>navigate("/check-list")}>Check list</Button>
            </div>
        </div>
    )
}
export default Event 