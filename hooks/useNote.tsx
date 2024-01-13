import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export const useNote = () => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("selectedNote");
  const queryKey = ["note", noteId];

  const { data, isLoading, error } = useQuery(
    queryKey,
    () => fetcher(`/api/notes?noteId=${noteId}`),
    {
      refetchInterval: 60000,
      enabled: !!noteId,
    }
  );
  return {
    noteInfo: data,
    isNoteLoading: isLoading,
    noteError: error,
  };
};
