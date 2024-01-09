import { AllFolders, Folder, Note } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UseSidebarFolder = {
  selectedFolder: Folder | null;
  setSelectedFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
  selectedNote: Note | null;
};

export const useSidebarChatLogic = (
  allFolders: AllFolders[],
  chatId: string,
  selectedNoteId: string | null
): UseSidebarFolder => {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (allFolders && allFolders.length > 0) {
      setSelectedFolder(allFolders[0]);
    }
  }, [allFolders]);

  useEffect(() => {
    if (selectedFolder?.notes.length === 0) {
      if (!selectedNoteId && selectedFolder?.notes.length > 0) {
        const defaultNoteId = selectedFolder.notes[0].id;
        push(`/chat/${chatId}/selectedNote?selectedNote=${defaultNoteId}`);
      }
    }
  }, [selectedNoteId, selectedFolder, chatId, push]);

  useEffect(() => {
    const updateSelectedNote = () => {
      const selectedNote = allFolders
        .map((folder) => folder.notes)
        .flat()
        .find((note) => note.id === selectedNoteId);
      setSelectedNote(selectedNote || null);
    };

    if (selectedNoteId) {
      updateSelectedNote();
    }
  }, [selectedNoteId, allFolders]);

  return { selectedFolder, setSelectedFolder, selectedNote };
};

export default useSidebarChatLogic;
