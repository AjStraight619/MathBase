"use client";

import { createContext, useContext, useState } from "react";

type DialogTriggerContextType = {
  isOpen: boolean;
  handleDialogTrigger: () => void;
};

const defaultDialogTriggerContext = {
  isOpen: false,
  handleDialogTrigger: () => {},
};

export const DialogTriggerContext = createContext<DialogTriggerContextType>(
  defaultDialogTriggerContext
);

export default function DialogTriggerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogTrigger = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <DialogTriggerContext.Provider value={{ isOpen, handleDialogTrigger }}>
      {children}
    </DialogTriggerContext.Provider>
  );
}

export const useDialogTriggerContext = () => {
  const context = useContext(DialogTriggerContext);
  if (context === undefined) {
    throw new Error(
      "useDialogTriggerContext must be used within a DialogTriggerProvider"
    );
  }
  return context;
};
