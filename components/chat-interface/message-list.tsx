import { ExtendedMessage } from "@/lib/types";
import MessageItem from "./message-item";

type MessageListProps = {
  messages: ExtendedMessage[];
  isLoading: boolean;
};

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const lastMessageId = messages[messages.length - 1]?.id;

  return (
    <ul className="list-none w-full">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isLoading={isLoading}
          isLastMessage={message.id === lastMessageId}
        />
      ))}
    </ul>
  );
}
