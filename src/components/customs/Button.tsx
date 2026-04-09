import { Button } from "../ui/button";

type Props = React.ComponentProps<"button"> & {
  text: string;
  variant: "primary" | "secondary";
};
const OwnButton = ({ text, variant, ...otherProps }: Props) => {
  let btnStyle = "";
  if (variant === "primary") {
    btnStyle = "border-[#267AB2] bg-[#EBF7FF]";
  } else if (variant === "secondary") {
    btnStyle = "bg-yellow-400";
  }
  return (
    <Button
      {...otherProps}
      className={`font-mono border text-[#00253D] px-[13px] py-[10px] min-w-[145px] md:min-w-[175px] leading-6 whitespace-nowrap uppercase cursor-pointer rounded-[15px] hover:animate-[glitch_0.2s] hover:bg-F9DBBA hover:text-black hover:border-yellow-400 active:bg-transparent active:text-yellow-400 active:border-black ${btnStyle}`}
    >
      {text}
    </Button>
  );
};
export default OwnButton;
