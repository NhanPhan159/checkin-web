import bgImg from "@/assets/imgs/img.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TUser } from "@/type";
import { Instagram, Linkedin, X } from "lucide-react";
const InformationCell = (props: { content: string; title: string }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-foreground">{props.content}</span>
      <span className="text-primary">{props.title}</span>
    </div>
  );
};
const ScanResult = (props: { result: TUser }) => {
  const a = [
    { content: "Likes", title: "Likes" },
    { content: "Likes", title: "Likes" },
    { content: "Likes", title: "Likes" },
  ];
  return (
    <>
      <div className="size-full flex justify-center">
        <div className="xl:w-1/3 xl:h-1/2 sm:w-full sm:h-full  px-2 py-4 rounded-3xl shadow-xl bg-white">
          <img src={bgImg} className="rounded-3xl h-1/3 w-full" />
          <div className="flex flex-col justify-center items-center gap-3 h-4/5 relative -top-[75px]">
            <Avatar className="xl:w-[150px] xl:h-[150px] sm:w-[60px] sm:h-[60px] ">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between items-center h-full">
              <h1 className="text-foreground">{props.result.FullName}</h1>
              <p className="w-3/4 text-accent">
                Product owner who focuses on simplity & usablily
              </p>
              <div className="flex w-full justify-center py-6 rounded-3xl bg-accent gap-10">
                {a.map((curr) => (
                  <InformationCell content={curr.content} title={curr.title} />
                ))}
              </div>
              <div className="flex w-full justify-center py-6  gap-10">
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
