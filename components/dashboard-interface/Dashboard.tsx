"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { useNavigation } from "@/hooks/useNavigation";
import { Chat, ChatMessage, Note } from "@prisma/client";
import { usePathname } from "next/navigation";
import ListItems from "./list-items";
import { DashboardSeparator } from "./separator";

type DashboardProps = {
  notes: Note[];
  chats: (Chat & { messages: ChatMessage[] })[];
};

export default function Dashboard({ notes, chats }: DashboardProps) {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebarContext();
  const currentListType = pathname.includes("notes") ? "notes" : "chats";
  const currentListItems = currentListType === "notes" ? notes : chats;
  const currentPath = useNavigation();
  console.log("This is the current path in dashboard", currentPath);

  return (
    <div
      className={`flex flex-col w-full p-4 ${
        isSidebarOpen ? "ml-[16rem]" : "ml-0"
      }`}
    >
      <DashboardSeparator currentListType={currentListType} />
      <ListItems currentListItems={currentListItems} />
    </div>
  );
}
