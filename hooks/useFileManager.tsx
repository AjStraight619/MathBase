"use client";
import { useFileContext } from "@/context/FileProvider";
import { useExtractedText } from "./useExtractedText";
import { useItemId } from "./useItemId";

export const useFileManager = () => {
  const { state: files, dispatch } = useFileContext();
  const chatId = useItemId();
  const { setExtractedText } = useExtractedText({
    role: "user",
    content: [""],
    math: false,
  });

  const getFileType = (file: File) => {
    return file.type;
  };

  const processFiles = async (formData: FormData) => {
    const filesToProcess = files.filter((file) => file.checked);

    for (const file of filesToProcess) {
      const fileType = getFileType(file.file);

      formData.append("file", file.file);

      try {
        const res = await fetch(`/api/parse-file?chatId=${chatId}`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Error parsing file of type: ${fileType}`);
        }

        const data = await res.json();
        console.log("Response data:", data);
        setExtractedText(data);
      } catch (error) {
        console.error(error);
      }
    }

    // Remove processed files
    filesToProcess.forEach((file) => {
      dispatch({ type: "REMOVE_FILE", payload: file.file.name });
    });
  };

  return { processFiles };
};
