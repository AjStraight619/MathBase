"use client";
import { HiBars3 } from "react-icons/hi2";

type SidebarToggleProps = {
  className?: string;
  handleSidebarToggle: () => void;
};

export default function SidebarToggle({
  className,
  handleSidebarToggle,
}: SidebarToggleProps) {
  return (
    <button className={`${className} z-50`} onClick={handleSidebarToggle}>
      <HiBars3 className="w-6 h-6 text-muted-foreground dark:hover:text-primary hover:text-primary hover:scale-105" />
    </button>
  );
}
