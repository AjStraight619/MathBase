"use client";
import { Chat, ChatMessage, Note, NoteContent } from "@prisma/client";
import { useRef } from "react";
import ListItem from "./list-item";

type ListItemProps = {
  currentListItems:
    | (Note & { contents: NoteContent[] })[]
    | (Chat & { messages: ChatMessage[] })[];
};
export default function ListItems({ currentListItems }: ListItemProps) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className="flex justify-center">
      <div className="grid gap-4 pt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {currentListItems?.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
