"use client";

import { isChat } from "@/lib/typeGuards";
import { Chat, ChatMessage, Note } from "@prisma/client";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type ListItemProps = {
  currentListItems: Array<Note | (Chat & { messages: ChatMessage[] })>;
};

type Item = Note | (Chat & { messages: ChatMessage[] });

export default function ListItem({ currentListItems }: ListItemProps) {
  const renderItemContent = (item: Item) => {
    if (isChat(item) && item.messages.length > 0) {
      return item.messages[0].content;
    } else if (!isChat(item)) {
      return item.content;
    }
    return "No content available";
  };

  return (
    <div className="grid lg:grid-cols-7 md:grid-cols-3 gap-4 pt-4">
      {currentListItems?.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 17,
              duration: 0.1,
            },
            scaleZ: 1.05,
            zIndex: 0.5,
          }}
        >
          <Card className="w-[14rem] h-[20rem] hover:cursor-pointer relative">
            <CardHeader className="text-left">{item.title}</CardHeader>
            <CardContent className="text-center text-opacity-90">
              {renderItemContent(item)}
            </CardContent>
            <CardFooter>
              <div className="flex flex-row absolute bottom-1 left-1">
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
