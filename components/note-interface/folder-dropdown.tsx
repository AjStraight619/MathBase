"use client";
import { AllFolders, Folder } from "@/lib/types";
import { useState } from "react";
import DropdownButton from "../ui/dropdown-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

type FolderDropDownProps = {
  allFolders: AllFolders[];
  selectedFolder: Folder | null;
  setSelectedFolder: (folder: Folder) => void;
};

export default function FolderDropdown({
  allFolders,
  selectedFolder,
  setSelectedFolder,
}: FolderDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFolderSelect = (folder: Folder) => {
    setSelectedFolder(folder);
    setIsOpen(false);
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-row justify-evenly w-full">
        <h3 className="text-muted-foreground text-md">Folders</h3>
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
      </div>
      <Separator className="w-full text-muted-foreground mt-1 mb-3" />
      <DropdownMenuContent>
        <div className="flex flex-col gap-2 w-full">
          {allFolders.map((folder) => (
            <button
              key={folder.id}
              className="flex flex-row items-center gap-2"
              onClick={() => handleFolderSelect(folder)}
            >
              <p className="text-sm font-medium text-muted-foreground">
                {folder.title}
              </p>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
