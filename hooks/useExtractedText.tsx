"use client";
import { ExtractedText } from "@/lib/types";
import { useState } from "react";

/**
 * Custom hook to manage extracted text state.
 *
 * @param {ExtractedText} initialText - Initial state value for extracted text
 * @returns {object} - An object containing the extractedText state and a setter function
 */

export const useExtractedText = (initialText: ExtractedText) => {
  const [extractedText, setExtractedText] =
    useState<ExtractedText>(initialText);

  return { extractedText, setExtractedText };
};
