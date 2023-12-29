"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { useExtendedChat } from "@/hooks/useExtendedChat";
import { useFileManager } from "@/hooks/useFileManager";
import { useItemId } from "@/hooks/useItemId";
import { ChatWithMessages } from "@/lib/types";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import EquationProcessor from "../equation-processor";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import MessageInput from "./message-input";
import MessageList from "./message-list";

export type ChatProps = {
  chatById: ChatWithMessages | null;
};

export default function Chat({ chatById }: ChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const { data: session } = useSession();
  const user = session?.user as User;
  const userId = user?.id;
  const { isSidebarOpen } = useSidebarContext();
  const chatId = useItemId();
  const { extractedEquations, isExtractedEquation, setIsExtractedEquation } =
    useFileManager();

  const {
    messages,
    input,
    setInput,
    handleSubmit,
    handleInputChange,
    isLoading,
  } = useExtendedChat({
    options: { api: `/api/chat?chatId=${chatId}`, body: { userId: userId } },
    chatById,
  });

  // useLayoutEffect(() => {
  //   if (autoScroll && scrollAreaRef.current) {
  //     const scrollArea = scrollAreaRef.current;
  //     scrollArea.scrollTop = scrollArea.scrollHeight;
  //   }
  // }, [messages, autoScroll]);

  useEffect(() => {
    if (autoScroll && bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight < scrollHeight - 100) {
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }
  };

  const containerVariants = {
    open: {
      marginLeft: "4rem",
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    closed: {
      marginLeft: "0rem",
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <ScrollArea
      ref={scrollAreaRef}
      onScroll={handleScroll}
      className="h-screen w-full overflow-y-auto"
    >
      <ScrollBar orientation="vertical" />
      <div className="flex flex-col items-center min-h-screen">
        <div className="container sm:max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4">
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate={isSidebarOpen ? "open" : "closed"}
            className="flex flex-col justify-between h-full relative pb-[4rem]"
          >
            <MessageList messages={messages} />
            {isExtractedEquation && (
              <EquationProcessor
                extractedEquations={extractedEquations}
                setIsExtractedEquation={setIsExtractedEquation}
              />
            )}
            <MessageInput
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
      <div ref={bottomOfMessagesRef} />
    </ScrollArea>
  );
}
