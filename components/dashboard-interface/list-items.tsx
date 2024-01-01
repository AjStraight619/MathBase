"use client";
import { Chat, ChatMessage, Note } from "@prisma/client";
import { useRef } from "react";
import ListItem from "./list-item";

type ListItemProps = {
  currentListItems: Array<Note | (Chat & { messages: ChatMessage[] })>;
};

export default function ListItems({ currentListItems }: ListItemProps) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="grid lg:grid-cols-6 md:grid-cols-3 gap-4 pt-4"
    >
      {currentListItems?.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
