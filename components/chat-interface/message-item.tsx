import { ExtendedMessage } from "@/lib/types"; // Ensure this import path is correct
import { AssistantAvatar, UserAvatar } from "../avatar/avatars";
import MarkdownContentRenderer from "./markdown-renderer";

type MessageItemProps = {
  message: ExtendedMessage;
  isLoading: boolean;
  isLastMessage?: boolean;
};

export default function MessageItem({
  message,
  isLoading,
  isLastMessage,
}: MessageItemProps) {
  const containsMarkdown = (content: string) => {
    const markdownPatterns = /(\*|_|`|\$|\[|\]|\(|\)|\!\[|\]\(|\$\$)/;
    return markdownPatterns.test(content);
  };

  return (
    <li className="my-8">
      <div className="flex items-start space-x-3 ml-[1.5rem]">
        {message.role === "user" ? (
          <UserAvatar />
        ) : (
          <AssistantAvatar isLoading={isLoading && isLastMessage} />
        )}
        <span className="break-words whitespace-pre-line max-w-full overflow-hidden text-sm">
          {containsMarkdown(message.content) ? (
            <MarkdownContentRenderer content={message.content} />
          ) : (
            <p>{message.content}</p>
          )}
        </span>
      </div>
    </li>
  );
}
