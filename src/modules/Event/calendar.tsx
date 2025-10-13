import { useState } from "react";
import img from "../../assets/imgs/calendar.png"
type TCalendar = {
  title: string;
  sections: {
    name: string[];
    duration: string;
  }[];
};
const dataCalendar: TCalendar[] = [
  {
    title: "Ngày 1: 16.10.2025",
    sections: [
      {
        name: [
          "Không gian trưng bày sản phẩm",
          "Khai mạc Không gian Kết nối B2B (Buyer quốc tế)",
        ],
        duration: "8h30 – 17h00",
      },
      {
        name: ["Hội thảo chuyên đề"],
        duration: "09h30 – 11h00",
      },
      {
        name: ["Đại hội Chi hội Lữ hành Đà Nẵng Nhiệm kỳ IV"],
        duration: "14h00 – 17h00",
      },
      {
        name: ["Hội thảo chuyên đề"],
        duration: "14h30 – 16h30",
      },
    ],
  },
  {
    title: "Ngày 2: 17.10.2025",
    sections: [
      {
        name: ["Hội thảo: “Chiến lược thu hút thị trường CIS 2026”"],
        duration: "8h30 – 11h30",
      },
      {
        name: [
          "Không gian trưng bày sản phẩm",
          "Không gian Kết nối B2B (Buyer nội địa)",
        ],
        duration: "8h30 – 17h30",
      },
      {
        name: ["Hội thảo chuyên đề: “Đà Nẵng mới – Vươn mình và Bứt phá”"],
        duration: "13h00 – 16h30",
      },
      {
        name: ["Gala dinner"],
        duration: "18h30 – 21h30",
      },
    ],
  },
];
const Calendar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
        <div className="flex justify-center gap-5 items-center mb-20">
            <img src={img} className="w-10 h-10" alt="" />
            <h1 className="text-center bg-gradient-to-r from-[#e8b51f] to-[#5aa871] bg-clip-text text-transparent">Lịch trình sự kiện</h1>
            
        </div>
      <div className="flex justify-center">
        {dataCalendar.map((calendar, index) => (
          <div
            key={calendar.title}
            onClick={() => setActiveIndex(index)}
            className={
              "rounded-sm p-3 cursor-pointer font-bold " +
              (activeIndex === index
                ? "bg-[#a30a0a] text-white "
                : "bg-[#eeeeee] text-[#c2c2c2]")
            }
          >
            {calendar.title}
          </div>
        ))}
      </div>
      <div className="relative top-16 left-[30%]">
        {/* Timeline line */}
        <div className="bg-[#a30a0a] absolute top-2 bottom-[16%] left-[11px] w-[3px]" />

        <div className="space-y-8">
          {dataCalendar[activeIndex].sections.map((event) => (
            <div
              key={event.duration}
              className="relative flex items-start gap-10"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex h-6 w-6 items-center justify-center">
                <div className="bg-[#a30a0a] h-4 w-4 flex justify-center items-center rounded-full">
                  <div className="bg-white h-3 w-3 rounded-full"></div>
                </div>
              </div>

              {/* Event content */}
              <div className="min-w-0 flex-1 pb-8">
                {event.name.map((curr) => (
                  <div key={curr} className="font-bold foreground text-xl">
                    {curr}
                  </div>
                ))}
                <div className="text-muted-foreground text-sm">
                  {event.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
