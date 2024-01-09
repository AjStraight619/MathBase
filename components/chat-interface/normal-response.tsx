"use client";
import { ExtendedMessage } from "@/lib/types";
import { containsMarkdown } from "@/lib/utils";
import { AssistantAvatar, UserAvatar } from "../avatar/avatars";
import MarkdownContentRenderer from "./markdown-renderer";

type NormalResponseProps = {
  message: ExtendedMessage;
  isLoading: boolean;
  isLastMessage?: boolean;
};

const NormalResponse = ({
  message,
  isLoading,
  isLastMessage,
}: NormalResponseProps) => {
  return (
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
      </div>
    </div>
  );
};

export default NormalResponse;
