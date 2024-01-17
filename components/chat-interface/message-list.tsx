"use client";
import { addChatContentToNote } from "@/actions/noteActions";
import { useItemId } from "@/hooks/useItemId";
import { useNoteId } from "@/hooks/useNoteId";
import { ExtendedMessage, MathResponseType } from "@/lib/types";
import toast from "react-hot-toast";
import MessageItem from "./message-item";

type MessageListProps = {
  selectedNoteTitle?: string;
  messages: ExtendedMessage[];
  isLoading: boolean;
  mathResponse: MathResponseType | null;
};

export default function MessageList({
  messages,
  isLoading,
  selectedNoteTitle,
  mathResponse,
}: MessageListProps) {
  const lastMessageId = messages[messages.length - 1]?.id;
  const chatId = useItemId();
  const { selectedNoteId } = useNoteId();

  const appendToNote = async (messageId: string) => {
    if (!selectedNoteId) {
      toast.error("Please select a note!");
      return;
    }
    const formData = new FormData();
    const messageContent = messages.find(
      (message) => message.id === messageId
    )?.content;
    formData.append("messageId", messageId);
    formData.append("chatId", chatId);
    formData.append("messageContent", messageContent ?? "");
    formData.append("selectedNoteId", selectedNoteId ?? "");

    const noteAdded = await addChatContentToNote(formData);
    if (!noteAdded) {
      toast.error("Something went wrong!");
      return;
    }

    if (noteAdded.error === "Message already exists in note") {
      toast.error("This message has already been added to the note.");
    } else if (noteAdded.error) {
      toast.error(noteAdded.error);
    } else if (noteAdded.noteMessage) {
      toast.success("Message added to note!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <ul className="list-none w-full relative">
      {messages.map((message) => {
        const { mathResponse, id } = message;
        return (
          <MessageItem
            key={id}
            message={message}
            isLoading={isLoading}
            appendToNote={appendToNote}
            isLastMessage={id === lastMessageId}
            selectedNoteTitle={selectedNoteTitle}
            mathResponse={mathResponse}
          />
        );
      })}
    </ul>
  );
}
