"use client";
import { createContext, useContext, useState } from "react";

type ViewProviderProps = {
  children: React.ReactNode;
};

type ViewContextType = {
  currentView: "chats" | "notes";
  setCurrentView: React.Dispatch<React.SetStateAction<"chats" | "notes">>;
};

const defaultContext: ViewContextType = {
  currentView: "chats",
  setCurrentView: () => {},
};

export const CurrentViewContext =
  createContext<ViewContextType>(defaultContext);

export default function CurrentViewProvider({ children }: ViewProviderProps) {
  const [currentView, setCurrentView] = useState<"chats" | "notes">("chats");

  return (
    <CurrentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </CurrentViewContext.Provider>
  );
}

export const useViewContext = () => {
  const context = useContext(CurrentViewContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentViewContext must be used within a CurrentViewProvider"
    );
  }
  return context;
};
