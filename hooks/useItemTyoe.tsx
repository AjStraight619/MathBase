"use client";
import { usePathname } from "next/navigation";

export const useItemType = () => {
  const pathname = usePathname();
  if (pathname.includes("notes")) return "notes";
  if (pathname.includes("chats")) return "chats";
};
