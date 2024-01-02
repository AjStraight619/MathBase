import { ExtendedMessage } from "@/lib/types"; // Ensure this import path is correct
import { useSearchParams } from "next/navigation";
import { FaFileCirclePlus } from "react-icons/fa6";
import { AssistantAvatar, UserAvatar } from "../avatar/avatars";
import MarkdownContentRenderer from "./markdown-renderer";

type MessageItemProps = {
  message: ExtendedMessage;
  isLoading: boolean;
  isLastMessage?: boolean;
  appendToNote: (messageId: string, selectedNoteId: string | undefined) => void;
  selectedNoteTitle?: string;
};

export default function MessageItem({
  message,
  isLoading,
  isLastMessage,
  appendToNote,
  selectedNoteTitle,
}: MessageItemProps) {
  const containsMarkdown = (content: string) => {
    const markdownPatterns = /(\*|_|`|\$|\[|\]|\(|\)|\!\[|\]\(|\$\$)/;
    return markdownPatterns.test(content);
  };
  const searchParams = useSearchParams();
  const selectedNoteId = searchParams?.get("selectedNote");

  return (
    <li className="my-8">
      <div className="flex items-start space-x-3 ml-[1.5rem]">
        {message.role === "user" ? (
          <UserAvatar />
        ) : (
          <AssistantAvatar isLoading={isLoading && isLastMessage} />
        )}
        <div className="flex flex-col break-words whitespace-pre-line max-w-full overflow-hidden text-sm">
          {/* Render message content */}
          {containsMarkdown(message.content) ? (
            <MarkdownContentRenderer content={message.content} />
          ) : (
            <p>{message.content}</p>
          )}

          {message.role === "assistant" && (
            <div className="mt-2 flex flex-row gap-2">
              <button
                onClick={() => appendToNote(message.id, selectedNoteId ?? "")}
                className="flex items-center text-primary/50 hover:text-primary"
              >
                <FaFileCirclePlus className="w-5 h-5" />
                <span className="text-muted-foreground text-sm ml-1">
                  {selectedNoteTitle
                    ? `Add to ${selectedNoteTitle}`
                    : "Select a note"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
