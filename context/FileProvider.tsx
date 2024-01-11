"use client";
import { LocalFile } from "@/lib/types";
import { createContext, useContext, useEffect, useReducer } from "react";

type FileContext = {
  state: LocalFile[];
  dispatch: React.Dispatch<FileAction>;
};
type FileAction =
  | { type: "ADD_FILE"; payload: LocalFile[] }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "TOGGLE_FILE"; payload: string }
  | { type: "VIEWED_FILE"; payload: string[] }
  | { type: "RESET_FILES" };

const defaultFileContext: FileContext = {
  state: [],
  dispatch: () => {},
};

const FileContext = createContext<FileContext>(defaultFileContext);

function fileReducer(state: LocalFile[], action: FileAction): LocalFile[] {
  switch (action.type) {
    case "ADD_FILE":
      return [...state, ...action.payload];
    case "REMOVE_FILE":
      return state.filter((file) => file.file.name !== action.payload);
    case "TOGGLE_FILE":
      return state.map((file) =>
        file.file.name === action.payload
          ? { ...file, checked: !file.checked }
          : file
      );
    case "VIEWED_FILE":
      return state.map((file) =>
        action.payload.includes(file.file.name)
          ? { ...file, isViewed: true }
          : file
      );
    case "RESET_FILES":
      return [];
    default:
      return state;
  }
}

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(fileReducer, []);

  useEffect(() => {
    window.localStorage.setItem("files", JSON.stringify(state));
  }, [state]);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
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
