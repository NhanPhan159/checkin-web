import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState, useCallback } from "react";
//@ts-expect-error:"import"
import Papa from "papaparse";

const spacing = { xs: 8, sm: 12, md: 16, xxs: 4 };
const seatMapColors = {
  background: "#f7fafc",
  seat: { background: "#e6eef8", text: "#0f172a" },
  focusedSeat: { background: "#2563eb", text: "#ffffff" },
};
const seatSize = 30;

type CSVSeatData = { name: string; image: string; column: string; row: string };
type SeatData = { name: string; image: string; column: string; row: number };

const parseCSV = (text: string): CSVSeatData[] => {
  const lines = text.trim().split("\n");
  return lines.slice(1).map((line) => {
    const [name, image, column, row] = line
      .split(",")
      .map((x) => x.trim().replace(/"/g, ""));
    return { name, image, column, row };
  });
};

const generateSeats = (csv?: CSVSeatData[]): SeatData[][] => {
  const rows = 6,
    cols = 13;
  const grid: SeatData[][] = [];
  for (let r = 0; r < rows; r++) {
    const rowSeats: SeatData[] = [];
    for (let c = 0; c < cols; c++) {
      const colChar = String.fromCharCode(65 + c);
      const found = csv?.find(
        (s) => s.column === colChar && s.row === (r + 1).toString()
      );
      rowSeats.push({
        row: r,
        column: colChar,
        name: found?.name || "",
        image: found?.image || "",
      });
    }
    grid.push(rowSeats);
  }
  return grid;
};

const Seat = ({
  seat,
  selected,
  onSelect,
}: {
  seat: SeatData;
  selected: boolean;
  onSelect: (s: SeatData) => void;
}) => (
  <button
    onClick={() => onSelect(seat)}
    style={{
      width: seatSize,
      height: seatSize,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: selected
        ? seatMapColors.focusedSeat.background
        : seatMapColors.seat.background,
      color: selected
        ? seatMapColors.focusedSeat.text
        : seatMapColors.seat.text,
      margin: 2,
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
    }}
  >
    {seat.column}
  </button>
);
type TData = {
  name: string;
  image: string;
};
export default function SeatMap({ csvUrl }: { csvUrl: string }) {
  const [csvData, setCsvData] = useState<CSVSeatData[]>([]);
  const [selected, setSelected] = useState<SeatData | null>(null);
  const [data, setData] = useState<TData[]>([]);

  const handleSelect = (val: string) => {
    for (const seat of seats) {
      const searchSeat = seat.find((curr) => curr.name === val);
      if (searchSeat) {
        setSelected({ ...searchSeat, row: +searchSeat.row })
        break;
      }
    }
  };

  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((t) => setCsvData(parseCSV(t)))
      .catch(console.error);
  }, [csvUrl]);

  const seats = useMemo(() => generateSeats(csvData), [csvData]);

  const onSelect = useCallback((s: SeatData) => {
    console.log(s);
    setSelected(s);
  }, []);
  useEffect(() => {
    Papa.parse("./event-1610-data-images.csv", {
      download: true,
      header: true, // dùng dòng đầu làm header
      skipEmptyLines: true,
      // complete: (result) => setData(result.data),
      complete: (result: Record<string, string> & { data: TData[] }) =>
        setData(result.data),
      error: (err: string) => console.error(err),
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        padding: spacing.sm,
        margin: "0 auto",
        zIndex: 1,
      }}
    >
      <img
        src="/tomko.png"
        alt=""
        className="absolute h-screen w-screen inset-0 -z-10 "
      />
      <h1 className=" bg-gradient-to-r from-[#e8b51f] to-[#5aa871] bg-clip-text text-transparent uppercase text-center mb-[50px] mt-[150px]">
        Seat Map
      </h1>

      {/* Responsive info panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacing.md,
          color: "white",
        }}
      >
        <div style={{ flex: "1 1 220px", minWidth: 200 }}>
          <div>
            <Select value={selected?.name} onValueChange={(val) => handleSelect(val)}>
              <SelectTrigger
                iconClassName="text-white opacity-100"
                className="w-[70%] h-[70px] focus-visible:ring-0 text-white data-[placeholder]:italic data-[placeholder]:text-white pl-0 ring-0 shadow-none border-0 border-b-white border-b-2 rounded-none"
              >
                <SelectValue placeholder="Nhập tên doanh nghiệp" className="" />
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
          <div>
            <strong>Unit:</strong> {selected?.name || "--"}
          </div>
          <div>
            <strong>Location:</strong>{" "}
            {selected ? `${selected.column}${selected.row + 1}` : "--"}
          </div>
          {selected?.image && (
            <img
              src={selected.image}
              alt="unit"
              style={{
                width: "100%",
                maxHeight: 150,
                objectFit: "cover",
                marginTop: spacing.sm,
              }}
            />
          )}
        </div>
        <div style={{ flex: "3 1 500px", overflowX: "auto" }}>
          {seats.map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 20, textAlign: "center", fontSize: 12 }}>
                {i + 1}
              </div>
              {row.map((seat) => (
                <Seat
                  key={`${seat.row}-${seat.column}`}
                  seat={seat}
                  selected={
                    selected?.row === seat.row &&
                    selected?.column === seat.column
                  }
                  onSelect={onSelect}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
