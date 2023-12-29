"use client";
import { AssistantAvatar, UserAvatar } from "@/components/avatar/avatars";
import ProcessFiles from "@/components/files/process-files";
import UploadFiles from "@/components/files/upload-files";
import { useSidebarContext } from "@/context/SidebarContext";
import { useExtendedChat } from "@/hooks/useExtendedChat";
import { useFileManager } from "@/hooks/useFileManager";
import { useItemId } from "@/hooks/useItemId";
import { ChatWithMessages } from "@/lib/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useLayoutEffect, useRef, useState } from "react";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import EquationProcessor from "../equation-processor";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import MarkdownContentRenderer from "./markdown-renderer";

/**
 * The Chat component is responsible for rendering the chat interface.
 * It displays chat messages and allows users to send new messages.
 * This component also uses the CodeRenderer to render messages that contain code.
 *
 * @returns {React.ReactElement} - The rendered JSX element representing the chat interface
 */

export type ChatProps = {
  chatById: ChatWithMessages | null;
};

export default function Chat({ chatById }: ChatProps): React.ReactElement {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const { data: session } = useSession();
  const user = session?.user as User;
  const userId = user?.id;

  const { isSidebarOpen } = useSidebarContext();
  const chatId = useItemId();
  const { extractedEquations, isExtractedEquation, setIsExtractedEquation } =
    useFileManager();

  const { messages, input, setInput, handleSubmit, isLoading } =
    useExtendedChat({
      options: {
        api: `/api/chat?chatId=${chatId}`,
        body: {
          userId: userId,
        },
      },
      chatById,
    });

  const containsMarkdown = (content: string) => {
    const markdownPatterns = /(\*|_|`|\$|\[|\]|\(|\)|\!\[|\]\(|\$\$)/;
    return markdownPatterns.test(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInput(value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.offsetHeight;
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useLayoutEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages, autoScroll]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight < scrollHeight - 100) {
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }
  };

  return (
    <ScrollArea ref={scrollAreaRef} onScroll={handleScroll}>
      <ScrollBar orientation="vertical" />
      <div className="flex flex-col items-center min-h-screen">
        <div className="container sm:max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4">
          <div
            className={`flex flex-col justify-between h-full relative pb-[4rem] ${
              isSidebarOpen ? "ml-[4rem]" : ""
            }`}
          >
            <ul className="overflow-auto overflow-x-hidden">
              {messages.map((m, index) => (
                <li key={index} className="my-8">
                  <div className="flex items-start space-x-3 ml-[1.5rem]">
                    {m.role === "user" ? <UserAvatar /> : <AssistantAvatar />}
                    <span className="break-words whitespace-pre-line max-w-full overflow-hidden text-sm">
                      {containsMarkdown(m.content) ? (
                        <MarkdownContentRenderer content={m.content} />
                      ) : (
                        <p>{m.content}</p>
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

            <div
              className={`fixed bottom-5 left-0 right-0 mx-auto w-full max-w-xl ${
                isSidebarOpen ? "md:left-[8rem]" : ""
              }`}
            >
              <div className="flex items-center justify-center">
                <ProcessFiles />
                <form
                  onSubmit={handleSubmit}
                  className="flex-1 flex items-center relative sm:w-3/4 md:w-2/3 lg:w-1/2"
                >
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 h-[52px] min-h-[52px] max-h-[200px] outline-none border rounded-xl pt-[0.8rem] pl-[1.5rem] pr-[2rem] sm:w-3/4 md:w-2/3 lg:w-1/2 bg-primary-foreground overflow-hidden resize-none placeholder:text-base text-base"
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
        </div>
      </div>
    </ScrollArea>
  );
}
