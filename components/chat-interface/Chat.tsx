"use client";
import { AssistantAvatar, UserAvatar } from "@/components/avatar/avatars";
import ProcessFiles from "@/components/files/process-files";
import UploadFiles from "@/components/files/upload-files";
import { Input } from "@/components/ui/input";
import { useFileManager } from "@/hooks/useFileManager";
import { useItemId } from "@/hooks/useItemId";
import { ChatWithMessages } from "@/lib/types";
import { User } from "@prisma/client";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import EquationProcessor from "../equation-processor";
import CodeRenderer from "./code-renderer";

/**
 * The Chat component is responsible for rendering the chat interface.
 * It displays chat messages and allows users to send new messages.
 * This component also uses the CodeRenderer to render messages that contain code.
 *
 * @returns {React.ReactElement} - The rendered JSX element representing the chat interface
 */

export type ChatProps = {
  chatById: ChatWithMessages | null;
  searchTerm?: string;
};

export default function Chat({
  chatById,
  searchTerm,
}: ChatProps): React.ReactElement {
  const { data: session } = useSession();
  const user = session?.user as User;
  const userId = user?.id;

  const chatId = useItemId();

  const { extractedEquations, isExtractedEquation, setIsExtractedEquation } =
    useFileManager();
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: `/api/chat?chatId=${chatId}`,
    body: {
      userId: userId,
    },
  });

  useEffect(() => {
    if (chatById) {
      const formattedMessages: Message[] = chatById.messages.map((msg) => ({
        id: msg.id,
        chatId: msg.chatId,
        content: msg.content,
        role: msg.role,
        isExtractedEquation: msg.isExtractedEquation,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
      }));
      setMessages([...formattedMessages]);
    }
  }, [setMessages, chatById]);

  const isCodeMessage = (content: string) => {
    return content.includes("```");
  };

  return (
    <div className="flex flex-col justify-between h-full relative pb-[4rem]">
      <ul className="overflow-auto overflow-x-hidden">
        {messages.map((m, index) => (
          <li
            key={index}
            className="list-none whitespace-pre-line text-sm my-8"
          >
            <div className="flex items-start space-x-3 ml-[1.5rem]">
              {m.role === "user" ? <UserAvatar /> : <AssistantAvatar />}
              <span className="break-words">
                {isCodeMessage(m.content) ? (
                  <CodeRenderer content={m.content} />
                ) : (
                  m.content
                )}
              </span>
              {isExtractedEquation && (
                <EquationProcessor
                  extractedEquations={extractedEquations}
                  setIsExtractedEquation={setIsExtractedEquation}
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="fixed bottom-4 left-[10rem] right-0 mx-auto w-full max-w-xl">
        <div className="flex items-center justify-center">
          <ProcessFiles />
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex items-center relative sm:w-3/4 md:w-2/3 lg:w-1/2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              className="flex-1 h-12 outline-none border rounded-xl px-4 py-2 mr-2 pl-[1.5rem] sm:w-3/4 md:w-2/3 lg:w-1/2 pr-2 bg-primary-foreground"
              placeholder="Message Note Genius..."
            />
            <button disabled={isLoading} type="submit">
              <BiSolidUpArrowCircle
                className={`${
                  isLoading ? "text-muted-foreground" : ""
                } w-6 h-6 absolute bottom-3 right-3`}
              />
            </button>
            <UploadFiles className="absolute left-0 " />
          </form>
        </div>
      </div>
    </div>
  );
}
