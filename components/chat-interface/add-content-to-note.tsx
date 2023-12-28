import { ChatMessage } from "@prisma/client";

type AddContentToNoteProps = {
  currentContent: ChatMessage;
};
export default function AddContentToNote({
  currentContent,
}: AddContentToNoteProps) {}
