import { useSearchParams } from "next/navigation";
import { FaFileCirclePlus } from "react-icons/fa6";

type AddContentToNoteProps = {
  selectedNoteTitle?: string;
  messageId: string;
  appendToNote: (messageId: string, selectedNoteId: string | undefined) => void;
};

export default function AddContentToNote({
  selectedNoteTitle,
  messageId,
  appendToNote,
}: AddContentToNoteProps) {
  const searchParams = useSearchParams();
  const selectedNoteId = searchParams?.get("selectedNote");

  return (
    <div className="mt-2 flex flex-row gap-2">
      <button
        onClick={() => appendToNote(messageId, selectedNoteId ?? "")}
        className="flex items-center text-primary/50 hover:text-primary"
      >
        <FaFileCirclePlus className="w-5 h-5" />
        <span className="text-muted-foreground text-sm ml-1">
          {selectedNoteTitle ? `Add to ${selectedNoteTitle}` : "Select a note"}
        </span>
      </button>
    </div>
  );
}
