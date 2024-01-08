"use client";
// import EquationProcessor from "@/components/math/equation-processor";
import MathKeyboard from "@/components/math/math-keyboard";
import { useMathModeContext } from "@/context/MathModeProvider";
import { useSidebarContext } from "@/context/SidebarContext";
import { useExtendedChat } from "@/hooks/useExtendedChat";
import { useItemId } from "@/hooks/useItemId";
import { useUser } from "@/hooks/useUser";
import { ChatWithMessages } from "@/lib/types";
import { motion } from "framer-motion";
import { lazy, useEffect, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import MessageInput from "./message-input";
import MessageList from "./message-list";

export type ChatProps = {
  chatById: ChatWithMessages | null;
  selectedNoteTitle?: string;
  defaultNoteTitle?: string;
};

const EquationProcessor = lazy(
  () => import("@/components/math/equation-processor")
);

export default function Chat({ chatById, selectedNoteTitle }: ChatProps) {
  const { mathMode } = useMathModeContext();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const { user, isUserLoading, error } = useUser();
  const userId = user?.id;
  const { isSidebarOpen } = useSidebarContext();
  const chatId = useItemId();
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const toggleMathKeyboard = () => setShowMathKeyboard((prev) => !prev);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useExtendedChat({
    options: { api: `/api/chat?chatId=${chatId}`, body: { userId: userId } },
    chatById,
  });

  const scrollToBottom = () => {
    bottomOfMessagesRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll && bottomOfMessagesRef.current) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    if (showMathKeyboard && bottomOfMessagesRef.current) {
      scrollToBottom();
    }
  }, [showMathKeyboard]);

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
        <div className="container sm:max-w-full md:max-w-xl lg:max-w-lg xl:max-w-xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate={isSidebarOpen ? "open" : "closed"}
            className={`flex flex-col justify-between h-full relative ${
              showMathKeyboard ? "pb-[20rem]" : "pb-[4rem]"
            }`}
          >
            <MessageList
              isLoading={isLoading}
              messages={messages}
              selectedNoteTitle={selectedNoteTitle}
            />
            <motion.div
              variants={containerVariants}
              animate={isSidebarOpen ? "open" : "closed"}
              className="flex flex-col fixed bottom-5 right-0 left-0 mx-auto w-full"
            >
              <MathKeyboard
                toggleMathKeyboard={toggleMathKeyboard}
                showMathKeyboard={showMathKeyboard}
                ref={inputRef}
              />
              <MessageInput
                input={input}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isLoading={isLoading}
                showMathKeyboard={showMathKeyboard}
                toggleMathKeyboard={toggleMathKeyboard}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div ref={bottomOfMessagesRef} />
    </ScrollArea>
  );
}
