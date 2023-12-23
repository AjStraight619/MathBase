"use client";
import { LocalFile } from "@/lib/types";
import { useEffect } from "react";
import { useExtractedText } from "./useExtractedText";

type UseFileManagerProps = {
  files: LocalFile[];
  setFiles: React.Dispatch<React.SetStateAction<LocalFile[]>>;
};

export const useFileManager = ({ files, setFiles }: UseFileManagerProps) => {
  const { setExtractedText } = useExtractedText({
    role: "user",
    content: [""],
    math: false,
  });

  useEffect(() => {
    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, [setFiles]);

  const getFileType = (file: File) => {
    return file.type;
  };

  const addFiles = (newFiles: LocalFile[]) => {
    setFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles];
      localStorage.setItem("files", JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  const toggleFileChecked = (fileName: string) => {
    setFiles((prev) => {
      const updatedFiles = prev.map((file) =>
        file.file.name === fileName ? { ...file, checked: !file.checked } : file
      );
      localStorage.setItem("files", JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  const processFiles = async (chatId: string) => {
    const filesToProcess = files.filter((file) => file.checked);

    for (const file of filesToProcess) {
      const fileType = getFileType(file.file);
      let apiUrl;

      if (fileType.startsWith("image/")) {
        apiUrl = `/api/parse-image?chatId=${chatId}`;
      } else if (fileType === "application/pdf") {
        apiUrl = `/api/parse-pdf?chatId=${chatId}`;
      } else {
        console.error(`Unsupported file type: ${fileType}`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file.file);

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Error parsing file of type: ${fileType}`);
        }

        const data = await res.json();
        console.log(
          "This is the data returned after the response in useFileManager: ",
          data
        );
        setExtractedText(data);
      } catch (error) {
        console.error(error);
      }
    }

    setFiles((prev) => prev.filter((file) => !file.checked));
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.file.name !== fileName));
  };

  return { files, addFiles, toggleFileChecked, processFiles, removeFile };
};
