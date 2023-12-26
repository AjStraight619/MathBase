"use client";
import { Chat, ChatMessage, Note } from "@prisma/client";
import { usePathname } from "next/navigation";
import ListItem from "./list-item";
import { DashboardSeparator } from "./separator";

type DashboardProps = {
  notes: Note[];
  chats: (Chat & { messages: ChatMessage[] })[];
};

export default function Dashboard({ notes, chats }: DashboardProps) {
  const pathname = usePathname();

  const currentListType = pathname.includes("notes") ? "notes" : "chats";

  const currentListItems = currentListType === "notes" ? notes : chats;
  console.log("This is the current list type in Dashboard", currentListType);
  return (
    <div className="flex flex-col w-full p-4">
      <DashboardSeparator currentListType={currentListType} />
      <ListItem
        currentListItems={currentListItems}
        currentListType={currentListType}
      />
    </div>
  );
}
