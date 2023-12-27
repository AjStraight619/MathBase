"use client";
import { createContext, useContext, useState } from "react";

type MathContext = {
  mathMode: boolean;
  toggleMathMode: () => void;
};

type MathModeProviderProps = {
  children: React.ReactNode;
};

const defaultMathContext: MathContext = {
  mathMode: false,
  toggleMathMode: () => {},
};

export const MathModeContext = createContext<MathContext>(defaultMathContext);

export default function MathModeProvider({ children }: MathModeProviderProps) {
  const [mathMode, setMathMode] = useState(false);

  const toggleMathMode = () => {
    setMathMode(!mathMode);
  };

  return (
    <MathModeContext.Provider value={{ mathMode, toggleMathMode }}>
      {children}
    </MathModeContext.Provider>
  );
}

export const useMathModeContext = () => {
  const context = useContext(MathModeContext);
  if (context === undefined) {
    throw new Error(
      "useMathModeContext must be used within a MathModeProvider"
    );
  }
  return context;
};
