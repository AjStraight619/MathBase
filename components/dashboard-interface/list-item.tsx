"use client";
import { useItemType } from "@/hooks/useItemTyoe";
import { isChat } from "@/lib/typeGuards";
import { Item } from "@/lib/types";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PiArrowSquareOutBold } from "react-icons/pi";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type ListItemProps = {
  item: Item;
};

export default function ListItem({ item }: ListItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { push } = useRouter();
  const itemType = useItemType();

  const renderItemContent = (item: Item) => {
    if (isChat(item) && item.messages.length > 0) {
      return item.messages[0].content;
    } else if (!isChat(item)) {
      return item.contents[0].content;
    }
    return "No content available";
  };
  return (
    <motion.div
      ref={ref}
      key={item.id}
      initial={{ opacity: 0, translateY: 50 }}
      animate={isInView ? { opacity: 1, translateY: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
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
      onClick={() => push(`/${itemType?.slice(0, -1)}/${item.id}`)}
    >
      <Card className="group w-[14rem] h-[20rem] hover:cursor-pointer relative">
        <PiArrowSquareOutBold className="absolute top-1 right-1 z-2 w-5 h-5 text-muted-foreground opacity-70 group-hover:translate-x-1 transition" />
        <CardHeader className="text-left font-semibold">
          {item.title}
        </CardHeader>
        <CardContent className="relative text-center text-opacity-90 line-clamp-5 overflow-hidden">
          {renderItemContent(item)}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white dark:to-zinc-950"></div>
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
  );
}
