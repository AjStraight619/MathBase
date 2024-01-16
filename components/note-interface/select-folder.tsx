"use client";
import { AllFolders, Folder } from "@/lib/types";
import { useState } from "react";
import DropdownButton from "../ui/dropdown-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type SelectFolderProps = {
  allFolders: AllFolders[];
  selectedFolder: Folder | null;
  setSelectedFolder: (folder: Folder) => void;
};

export default function SelectFolder({
  allFolders,
  selectedFolder,
  setSelectedFolder,
}: SelectFolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleFolderSelect = (folder: Folder) => {
    setSelectedFolder(folder);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex flex-row items-center gap-2">
        {selectedFolder ? (
          <p className="text-sm font-medium text-muted-foreground">
            {selectedFolder.title}
          </p>
        ) : (
          <p className="text-sm font-medium text-muted-foreground">
            Select Folder
          </p>
        )}
        <DropdownButton isOpen={isOpen} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-full p-2">
        {allFolders.map((folder) => {
          return (
            <button key={folder.id} onClick={() => handleFolderSelect(folder)}>
              {folder.title}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
