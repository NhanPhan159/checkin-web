import bgImg from "@/assets/imgs/img.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
const InformationCell = (props: {
  content: string;
  title: string;
  element: ReactElement;
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-secondary-foreground text-xl m-x-2.5">
        {props.content}
      </span>
      <div className="flex gap-2">
        {props.element}
        <span className="text-secondary">{props.title}</span>
      </div>
    </div>
  );
};
const ScanResult = (props: { result: TUser }) => {
  const [informationCells, setInformationCells] = useState<
    Record<string, string | ReactElement>[]
  >([]);
  const generateInformationCells = useCallback(() => {
    const a = [];
    if (props.result.phone) {
      a.push({
        content: props.result.phone,
        title: "Phone",
        element: <Phone />,
      });
    }
    if (props.result.status) {
      a.push({
        content: props.result.status,
        title: "Status",
        element: <Info />,
      });
    }
    if (props.result.sex) {
      a.push({
        content: props.result.sex,
        title: "Sex",
        element: <VenusAndMars />,
      });
    }
    setInformationCells(a);
  }, [props.result]);
  useEffect(() => {
    generateInformationCells();
  }, [generateInformationCells]);
  return (
    <>
      <div className="size-full flex justify-center">
        <div className="lg:w-[40%] lg:h-4/5 w-4/5 h-4/5 px-2 py-4 rounded-3xl shadow-xl bg-white">
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
            <div className="flex flex-col justify-between items-center lg:gap-3 gap-4 size-full">
              <h1 className="text-secondary-foreground text-2xl">
                {props.result.FullName}
              </h1>
              <p className="w-3/4 text-secondary text-center">
                Event Name Here
              </p>
              <div className="flex w-full justify-center sm:justify-around py-6 md:py-4 rounded-3xl bg-accent gap-7 lg:gap-0">
                {informationCells.map((curr) => (
                  <InformationCell
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
      </div>
    </>
  );
};
export default ScanResult;
