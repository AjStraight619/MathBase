"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { DataPoint } from "@/lib/types";
import { Chat, ChatMessage, Note, NoteContent } from "@prisma/client";
import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import ListItems from "./list-items";
import { DashboardSeparator } from "./separator";

type DashboardProps = {
  notes: (Note & { contents: NoteContent[] })[];
  chats: (Chat & { messages: ChatMessage[] })[];
  lineChartData: DataPoint[];
};

export default function Dashboard({
  notes,
  chats,
  lineChartData,
}: DashboardProps) {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebarContext();
  const currentListType = pathname.includes("notes")
    ? "notes"
    : pathname.includes("chats")
    ? "chats"
    : "history";
  const currentListItems = currentListType === "notes" ? notes : chats;

  return (
    <ScrollArea
      className={`flex flex-col w-full p-4 ${
        isSidebarOpen ? "md:ml-[16rem] ml:0" : "ml-0"
      }`}
    >
      <DashboardSeparator currentListType={currentListType} />
      {currentListType !== "history" ? (
        <ListItems currentListItems={currentListItems} />
      ) : (
        /* <History lineChartData={lineChartData} /> */
        <div className="text-center">Currently in development</div>
      )}
    </ScrollArea>
  );
}
