import { getErrorMessage } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useNoteId = () => {
  const searchParams = useSearchParams();
  const [selectedNoteId, setSelectedNoteId] = useState(
    searchParams.get("selectedNote")
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedNoteId) {
      const getInitialNoteId = async () => {
        try {
          const res = await fetch("/api/notes/initialId");
          if (res.ok) {
            const data = await res.json();
            setSelectedNoteId(data.noteId);
          } else {
            setError("Error fetching initial note ID");
          }
        } catch (error) {
          setError(getErrorMessage(error));
        }
      };
      getInitialNoteId();
    }
  }, []);

  useEffect(() => {
    const newNoteId = searchParams.get("selectedNote");
    if (newNoteId !== selectedNoteId) {
      setSelectedNoteId(newNoteId);
    }
  }, [searchParams, selectedNoteId]);

  return {
    error,
    selectedNoteId,
  };
};
