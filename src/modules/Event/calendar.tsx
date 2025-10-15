import { useState } from "react";
import img from "../../assets/imgs/calendar.png";

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
    <div className="relative w-screen h-screen py-10 ">
      <img
        src="/tomko.png"
        alt=""
        className="absolute h-screen w-screen inset-0 z-0 "
      />
      <div className="relative bg-white py-10 mx-4 rounded-2xl top-30 z-10">
        <div className="flex justify-center gap-3 items-center mb-10">
          <img
            src={img}
            className="w-10 h-10 max-sm:w-6 max-sm:h-6"
            alt="calendar icon"
          />
          <h1 className="sm:text-2xl font-bold text-center bg-gradient-to-r from-[#e8b51f] to-[#5aa871] bg-clip-text text-transparent">
            Lịch trình sự kiện
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {dataCalendar.map((calendar, index) => (
            <div
              key={calendar.title}
              onClick={() => setActiveIndex(index)}
              className={
                "rounded-sm p-3 text-sm sm:text-base cursor-pointer font-bold text-center min-w-[120px] transition-colors " +
                (activeIndex === index
                  ? "bg-[#a30a0a] text-white"
                  : "bg-[#eeeeee] text-[#c2c2c2]")
              }
            >
              {calendar.title}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative sm:left-[30%] sm:top-16 top-8 left-0 px-6 sm:px-0">
          {/* Line */}
          <div className="bg-[#a30a0a] absolute top-2 bottom-[15%] sm:left-[9px] left-[33px] w-[2px]" />

          <div className="space-y-6">
            {dataCalendar[activeIndex].sections.map((event) => (
              <div
                key={event.duration}
                className="relative flex items-start gap-5"
              >
                {/* Dot */}
                <div className="relative z-10 flex h-5 w-5 items-center justify-center">
                  <div className="bg-[#a30a0a] h-3 w-3 rounded-full flex items-center justify-center">
                    <div className="bg-white h-2 w-2 rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  {event.name.map((curr) => (
                    <div
                      key={curr}
                      className="font-bold text-base sm:text-xl text-gray-800"
                    >
                      {curr}
                    </div>
                  ))}
                  <div className="text-sm text-gray-500">{event.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
