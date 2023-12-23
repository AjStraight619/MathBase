import { cn } from "@/lib/utils";
import { BsPaperclip } from "react-icons/bs";

type UploadIconProps = {
  className?: string;
  onClick?: () => void;
};

export const UploadIcon = ({ className, onClick }: UploadIconProps) => {
  return (
    <BsPaperclip
      className={cn("text-2xl hover:cursor-pointer text-primary", className)}
      onClick={onClick}
    />
  );
};
