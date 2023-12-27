"use client";
import {
  addExtractedEquationsToDb,
  addExtractedTextToDb,
} from "@/actions/chatActions";
import { useFileContext } from "@/context/FileProvider";
import { useMathModeContext } from "@/context/MathModeProvider";
import { useState } from "react";
import { useExtractedText } from "./useExtractedText";
import { useItemId } from "./useItemId";

export const useFileManager = () => {
  const { state: files, dispatch } = useFileContext();
  const chatId = useItemId();
  const { setExtractedText, extractedText } = useExtractedText();
  const { mathMode } = useMathModeContext();
  const [isExtractedEquation, setIsExtractedEquation] = useState(false);
  const [extractedEquations, setExtractedEquations] = useState<string[]>([]);

  const getFileType = (file: File) => {
    return file.type;
  };

  const processFiles = async (formData: FormData) => {
    let apiUrl;
    if (mathMode) {
      apiUrl = "/api/extract-equations";
    } else {
      apiUrl = `/api/parse-file?chatId=${chatId}`;
    }
    const filesToProcess = files.filter((file) => file.checked);
    console.log("apiUrl", apiUrl);

    for (const file of filesToProcess) {
      const fileType = getFileType(file.file);

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
        const { response } = data;
        if (mathMode) {
          const extractedEquations = await addExtractedEquationsToDb(
            response,
            chatId
          );
          console.log("extractedEquations", extractedEquations);
          setIsExtractedEquation(true);
        } else {
          await addExtractedTextToDb(chatId, data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    filesToProcess.forEach((file) => {
      dispatch({ type: "REMOVE_FILE", payload: file.file.name });
    });
  };

  return {
    processFiles,
    extractedText,
    extractedEquations,
    setIsExtractedEquation,
    isExtractedEquation,
  };
};
