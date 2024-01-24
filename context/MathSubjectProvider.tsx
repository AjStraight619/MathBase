"use client";
import { createContext, useContext, useState } from "react";

type MathSelectionContextType = {
  subject: string;
  handleSubject: () => void;
};

const defaultContext: MathSelectionContextType = {
  subject: "Algebra",
  handleSubject: () => {},
};

export const MathContext =
  createContext<MathSelectionContextType>(defaultContext);

export default function MathSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subject, setSubject] = useState("");
  const handleSubject = () => {
    setSubject("");
  };
}

export const useMathSubjectContext = () => {
  const context = useContext(MathContext);

  if (context === undefined) {
    throw new Error(
      "useMathSubjectContext must be used within a MathModeProvider"
    );
  }

  return context;
};
