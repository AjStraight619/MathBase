"use client";
import { useMathModeContext } from "@/context/MathModeProvider";
import { ExtractedText } from "@/lib/types";
import { useState } from "react";

/**
 * Custom hook to manage extracted text state.
 *
 * @param {ExtractedText} initialText - Initial state value for extracted text
 * @returns {object} - An object containing the extractedText state and a setter function
 */

export const useExtractedText = () => {
  const { mathMode } = useMathModeContext();
  const [extractedText, setExtractedText] = useState<ExtractedText>({
    role: "user",
    content: [""],
    math: mathMode,
  });

  return { extractedText, setExtractedText };
};
