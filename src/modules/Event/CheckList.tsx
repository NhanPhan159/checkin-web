import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
//@ts-expect-error:"import"
import Papa from "papaparse";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import html2canvas from "html2canvas-pro";

type TData = {
  name: string;
  image: string;
};
type TCheckItem = {
  checked: boolean;
  name: string;
};

const CheckList = () => {
  const checkListSize = 10;
  const [data, setData] = useState<TData[]>([]);
  const [checkList, setCheckList] = useState<TCheckItem[]>(
    Array(checkListSize).fill({ checked: false, name: "" })
  );
  const [selected, setSelected] = useState<{ name: string }[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleCheck = (index: number, value: boolean) => {
    setCheckList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: value } : item))
    );
  };
  const handleSelect = (index: number, value: string) => {
    setCheckList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name: value } : item))
    );
  };
  const handleSaveClick = () => {
    const chosen = checkList.filter(
      (value) => value.checked && value.name.length
    );
    const chosenName = chosen.map((curr) => ({ name: curr.name }));
    setSelected(chosenName);
    setOpenDialog(true);
  };

  useEffect(() => {
    Papa.parse("./event-1610-data-images.csv", {
      download: true,
      header: true, // dùng dòng đầu làm header
      skipEmptyLines: true,
      // complete: (result) => setData(result.data),
      complete: (result: Record<string,string> & {data: TData[]}) => setData(result.data),
      error: (err:string) => console.error(err),
    });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <img
        src="/tomko.png"
        alt=""
        className="absolute h-screen w-screen inset-0 z-0 "
      />
      <div className="w-full mt-16 z-1">
        <h1 className="uppercase font-semibold bg-clip-text bg-gradient-to-r from-[#e8b51f] to-[#5aa871] text-transparent text-center mb-10">
          Check list meeting
        </h1>
        {Array(checkListSize)
          .fill(0)
          .map((_curr, index) => (
            <div className="mb-3 w-full flex justify-center gap-4 items-end">
              <Checkbox
                className="size-5"
                checked={checkList[index].checked}
                onCheckedChange={(val) => handleCheck(index, !!val)}
              />
              <Select
                onValueChange={(val) => handleSelect(index, val)}
                key={index}
              >
                <SelectTrigger
                  iconClassName="text-white opacity-100"
                  className="w-[70%] h-[70px] focus-visible:ring-0 text-white data-[placeholder]:italic data-[placeholder]:text-white pl-0 ring-0 shadow-none border-0 border-b-white border-b-2 rounded-none"
                >
                  <SelectValue
                    placeholder="Nhập tên doanh nghiệp"
                    className=""
                  />
                </SelectTrigger>
                <SelectContent>
                  {data.map((curr) => (
                    <SelectItem key={curr.name} value={curr.name}>
                      {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        <div className="w-[90%] flex justify-end ">
          <Button className="bg-white text-[#A24100]" onClick={handleSaveClick}>
            Lưu lại
          </Button>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex items-center justify-center bg-black/70">
          <div ref={imageRef} className="w-full h-[70vh] rounded-lg">
            <img
              src="/tomko.png"
              alt=""
              className="absolute rounded-lg -z-10 inset-0 w-full h-full object-cover"
            />
            <div className="mt-24 z-20 w-full">
              <h1 className="uppercase font-semibold !text-lg text-white text-center mb-10">
                Check list meeting
              </h1>
              {selected.map((item, idx) => (
                <div key={idx} className="text-white text-sm font-bold mx-4">
                  {idx + 1}. {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-3">
            <Button
              className="bg-white text-[#A24100]"
              onClick={async () => {
                if (!imageRef.current) return;
                const canvas = await html2canvas(imageRef.current);
                const link = document.createElement("a");
                link.download = "checklist.png";
                link.href = canvas.toDataURL();
                link.click();
              }}
            >
              Tải ảnh
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckList;
