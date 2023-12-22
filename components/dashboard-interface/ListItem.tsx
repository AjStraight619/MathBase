"use client";

import { Chat, Note } from "@prisma/client";
import { Card } from "../ui/card";

type ListItemProps = {
  currentListItems: Note[] | Chat[];
  searchTerm: string | string[] | undefined;
};

export default function ListItem({
  currentListItems,
  searchTerm,
}: ListItemProps) {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {currentListItems.map((item) => (
        <Card key={item.id}>{item.title}</Card>
      ))}
    </div>
  );
}

const filterItems = (items: Note[] | Chat[], searchTerm: string) => {
  if (!searchTerm) {
    return items;
  }

  return items.filter((item) => {
    const term = searchTerm.toLowerCase();
    const title = item.title.toLowerCase();

    return title.includes(term);
  });
};
