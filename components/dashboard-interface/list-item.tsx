"use client";

import { isChat } from "@/lib/typeGuards";
import { Chat, ChatMessage, Note } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type ListItemProps = {
  currentListItems: Array<Note | (Chat & { messages: ChatMessage[] })>;
};

type Item = Note | (Chat & { messages: ChatMessage[] });

export default function ListItem({ currentListItems }: ListItemProps) {
  const counterRef = useRef(0);

  useEffect(() => {
    counterRef.current++;
    console.log("rendered", counterRef.current);
  });

  const renderItemContent = (item: Item) => {
    if (isChat(item) && item.messages.length > 0) {
      return item.messages[0].content;
    } else if (!isChat(item)) {
      return item.content;
    }
    return "No content available";
  };

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 pt-4">
      {currentListItems?.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        >
          <Card className="w-[14rem] h-[20rem] hover:cursor-pointer relative">
            <CardHeader className="text-center">{item.title}</CardHeader>
            <CardContent className="text-center text-opacity-90">
              {renderItemContent(item)}
            </CardContent>
            <CardFooter>
              <div className="flex flex-row absolute bottom-1 right-1">
                <span className="text-xs text-muted-foreground">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
