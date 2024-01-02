"use client";
import { addChatContentToNote } from "@/actions/noteActions";
import { useItemId } from "@/hooks/useItemId";
import { ExtendedMessage } from "@/lib/types";
import MessageItem from "./message-item";

type MessageListProps = {
  selectedNoteTitle?: string;
  messages: ExtendedMessage[];
  isLoading: boolean;
};

export default function MessageList({
  messages,
  isLoading,
  selectedNoteTitle,
}: MessageListProps) {
  const lastMessageId = messages[messages.length - 1]?.id;
  const chatId = useItemId();

  const appendToNote = async (
    messageId: string,
    selectedNoteId: string | undefined
  ) => {
    const formData = new FormData();
    const messageToAppend = messages.find(
      (message) => message.id === messageId
    )?.content;
    formData.append("messageId", messageId);
    formData.append("chatId", chatId);
    formData.append("messageToAppend", messageToAppend ?? "");
    formData.append("selectedNoteId", selectedNoteId ?? "");

    await addChatContentToNote(formData);
  };
  return (
    <ul className="list-none w-full relative">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isLoading={isLoading}
          appendToNote={appendToNote}
          isLastMessage={message.id === lastMessageId}
          selectedNoteTitle={selectedNoteTitle}
        />
      ))}
    </ul>
  );
}
