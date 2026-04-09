import bgImg from "@/assets/imgs/img.jpg";
import OwnButton from "@/components/customs/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import firebaseHelper from "@/lib/firebase/FirebaseDB";
import { TUser } from "@/type";
import Utils from "@/utils";
import {
  Info,
  Instagram,
  Linkedin,
  Phone,
  VenusAndMars,
  X,
} from "lucide-react";
import { ReactElement, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const InformationCell = (props: {
  content: string;
  title: string;
  element: ReactElement;
}) => {
  return (
    <div className="flex flex-col items-center sm:w-full w-fit">
      <span className="text-secondary-foreground text-[1rem] md:text-xl m-x-2.5">
        {props.content}
      </span>
      <div className="flex gap-2">
        {props.element}
        <span className="text-secondary hidden sm:block">{props.title}</span>
      </div>
    </div>
  );
};
type TInformationCell = {
  content: string | number;
  title: string;
  element: ReactElement;
};

const ScanResult = (props: { result: TUser }) => {
  const [informationCells, setInformationCells] = useState<TInformationCell[]>(
    [],
  );
  const nav = useNavigate();

  const generateInformationCells = useCallback(() => {
    const a = [];
    if (props.result.phone) {
      a.push({
        content: props.result.phone,
        title: "Phone",
        element: <Phone />,
      });
    }
    if (props.result.sex) {
      a.push({
        content: props.result.sex,
        title: "Sex",
        element: <VenusAndMars />,
      });
    }
    if (props.result.status) {
      a.push({
        content: props.result.status,
        title: "Status",
        element: <Info />,
      });
    }

    setInformationCells(a);
  }, [props.result]);
  const handleCheckin = async () => {
    try {
      const isSuccess = !!(await firebaseHelper.updateUser(props.result.id));
      if (isSuccess) toast.success("You check-in successfully 😊");
      else toast.error("Can not find your register name 😥");
    } catch (e) {
      if (e instanceof Error) toast.error(`${e.name} : ${e.message}`);
      toast.error("something gets error in handleCheckin");
    }
  };

  useEffect(() => {
    generateInformationCells();
  }, [generateInformationCells]);

  return (
    <>
      <div className="size-full flex-col items-center gap-3 flex justify-center">
        <div className="lg:w-[40%] lg:h-4/5 md:w-4/5 md:h-4/5 w-[90%] h-[90%] px-2 py-4 rounded-3xl shadow-xl bg-white">
          <img src={bgImg} className="rounded-3xl h-1/3 w-full" />
          <div className="flex flex-col justify-center items-center gap-3 h-4/5 relative lg:-top-[75px] md:-top-[80px] sm:-top-[100px] -top-[80px] ">
            <Avatar className="lg:size-[150px] md:size-[160px] sm:size-[170px] size-[150px]">
              <AvatarImage
                src={Utils.getAvaterByIndex(+props.result.avatar)}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center lg:justify-between items-center gap-7 size-full">
              <h1 className="text-secondary-foreground text-2xl">
                {props.result.FullName}
              </h1>
              <p className="w-3/4 text-secondary text-center">
                Event Name Here
              </p>
              <div className="flex w-full justify-center md:justify-around rounded-3xl bg-accent gap-6 lg:gap-0  px-4 py-6 md:py-4 sm: px-0">
                {informationCells.map((curr) => (
                  <InformationCell
                    key={curr.content as string}
                    content={curr.content as string}
                    title={curr.title as string}
                    element={curr.element as ReactElement}
                  />
                ))}
              </div>
              <div className="flex w-full justify-center pb-3 gap-10">
                <Instagram />
                <Linkedin />
                <X />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <OwnButton
            onClick={handleCheckin}
            variant="primary"
            text="Check-in"
          />
          <OwnButton
            text="Go back"
            variant={"secondary"}
            onClick={() => nav(-1)}
          />
        </div>
      </div>
    </>
  );
};
export default ScanResult;
