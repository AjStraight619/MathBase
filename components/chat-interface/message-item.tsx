import { ExtendedMessage, MathResponseType } from "@/lib/types"; // Ensure this import path is correct
import { containsMarkdown } from "@/lib/utils";
import { AssistantAvatar, UserAvatar } from "../avatar/avatars";
import AddContentToNote from "./add-content-to-note";
import MarkdownContentRenderer from "./markdown-renderer";

type MessageItemProps = {
  message: ExtendedMessage;
  isLoading: boolean;
  isLastMessage?: boolean;
  appendToNote: (messageId: string, selectedNoteId: string | undefined) => void;
  selectedNoteTitle?: string;
  mathResponse: MathResponseType | null;
};

export default function MessageItem({
  message,
  isLoading,
  isLastMessage,
  appendToNote,
  selectedNoteTitle,
}: MessageItemProps) {
  return (
    <li className="my-8">
      <div className="flex items-start space-x-3 ml-[1.5rem]">
        {message.role === "user" ? (
          <UserAvatar />
        ) : (
          <AssistantAvatar isLoading={isLoading && isLastMessage} />
        )}
        <div className="flex flex-col break-words whitespace-pre-line max-w-full overflow-hidden text-sm">
          {containsMarkdown(message.content) ? (
            <MarkdownContentRenderer content={message.content} />
          ) : (
            <p>{message.content}</p>
          )}

          {message.role === "assistant" && (
            <AddContentToNote
              selectedNoteTitle={selectedNoteTitle}
              appendToNote={appendToNote}
              messageId={message.id}
            />
          )}
        </div>
      </div>
    </li>
  );
}
