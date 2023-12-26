"use client";
import { LocalFile } from "@/lib/types";
import { createContext, useContext, useState } from "react";

type FileContext = {
  files: LocalFile[];
  setFiles: React.Dispatch<React.SetStateAction<LocalFile[]>>;
};

const defaultFileContext: FileContext = {
  files: [],
  setFiles: () => {},
};

const FileContext = createContext<FileContext>(defaultFileContext);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<LocalFile[]>([]);
  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
