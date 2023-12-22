"use client";

import { Chat, Note } from "@prisma/client";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { DashboardSeparator } from "./separator";

type DashboardProps = {
  notes: Note[];
  chats: Chat[];
  searchTerm: string | string[] | undefined;
};

type CurrentListType = "notes" | "chats";

export default function Dashboard({
  notes,
  chats,
  searchTerm,
}: DashboardProps) {
  const [currentListItems, setCurrentListItems] = useState<Note[] | Chat[]>(
    notes
  );

  const [currentListType, setCurrentListType] =
    useState<CurrentListType>("notes");

  useEffect(() => {
    if (currentListType === "notes") {
      setCurrentListItems(notes);
    } else {
      setCurrentListItems(chats);
    }
  }, [chats, currentListType, notes]);

  return (
    <div className="flex flex-col w-full p-4">
      <DashboardSeparator
        setCurrentListType={setCurrentListType}
        currentListType={currentListType}
      />
      <ListItem currentListItems={currentListItems} searchTerm={searchTerm} />
    </div>
  );
}
