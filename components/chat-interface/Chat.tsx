"use client";
// import EquationProcessor from "@/components/math/equation-processor";
import { useSidebarContext } from "@/context/SidebarContext";
import { useExtendedChat } from "@/hooks/useExtendedChat";
import { useItemId } from "@/hooks/useItemId";
import { useUser } from "@/hooks/useUser";
import { ChatWithMessages, MathResponseType } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MathToolbar from "../math/math-tool-bar";
import { ScrollArea } from "../ui/scroll-area";
import MessageInput from "./message-input";
import MessageList from "./message-list";

export type ChatProps = {
  chatById: ChatWithMessages | null;
  selectedNoteTitle?: string;
  defaultNoteTitle?: string;
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

export default function Chat({ chatById, selectedNoteTitle }: ChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const { user } = useUser();
  const userId = user?.id;
  const { isSidebarOpen } = useSidebarContext();
  const chatId = useItemId();
  const [showMathToolbar, setShowMathToolbar] = useState(false);
  const [mathResponse, setMathResponse] = useState<MathResponseType | null>(
    null
  );
  const toggleMathToolbar = () => setShowMathToolbar((prev) => !prev);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useExtendedChat({
      options: {
        api: `/api/chat?chatId=${chatId}`,
        body: {
          mathResponse: mathResponse ? mathResponse : null,
          userId: userId,
          prompt: mathResponse
            ? "The user has inputed a math question and you are recieving the correct answer from wolfram alpha, answer any questions the user may have about the problem. If you don't see any indication of a math problem, inform the user"
            : "",
        },
      },
      chatById,
    });

  const scrollToBottom = () => {
    bottomOfMessagesRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("This is the current math response: ", mathResponse);
  }, [mathResponse]);

  useEffect(() => {
    if (autoScroll && bottomOfMessagesRef.current) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    if (showMathToolbar && bottomOfMessagesRef.current) {
      scrollToBottom();
    }
  }, [showMathToolbar]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight < scrollHeight - 100) {
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }
  };

  return (
    <ScrollArea
      ref={scrollAreaRef}
      onScroll={handleScroll}
      className="h-screen w-full overflow-y-auto"
    >
      <div className="flex flex-col items-center min-h-screen">
        <div className="container sm:max-w-full md:max-w-xl lg:max-w-lg xl:max-w-xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate={isSidebarOpen ? "open" : "closed"}
            className={`flex flex-col justify-between h-full relative ${
              showMathToolbar ? "pb-[22rem]" : "pb-[4rem]"
            }`}
          >
            <MessageList
              isLoading={isLoading}
              messages={messages}
              selectedNoteTitle={selectedNoteTitle}
              mathResponse={mathResponse}
            />
            <motion.div
              variants={containerVariants}
              animate={isSidebarOpen ? "open" : "closed"}
              className="flex flex-col fixed bottom-5 right-0 left-0 mx-auto w-full"
            >
              <MathToolbar
                toggleMathToolbar={toggleMathToolbar}
                showMathToolbar={showMathToolbar}
                setMathResponse={setMathResponse}
              />
              <MessageInput
                input={input}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isLoading={isLoading}
                showMathKeyboard={showMathToolbar}
                toggleMathToolbar={toggleMathToolbar}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div ref={bottomOfMessagesRef} />
    </ScrollArea>
  );
}
