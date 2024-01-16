"use client";
import { addNewFolder } from "@/actions/noteActions";
import { Folder } from "@/lib/types";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import DropdownButton from "../ui/dropdown-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

type FolderDropDownProps = {
  allFolders: Folder[];
  selectedFolder: Folder | null;
  setSelectedFolder: (folder: Folder) => void;
};

export default function FolderDropdown({
  allFolders,
  selectedFolder,
  setSelectedFolder,
}: FolderDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { pending } = useFormStatus();

  const handleFolderSelect = (folder: Folder) => {
    setSelectedFolder(folder);
    setIsOpen(false);
  };

  const handleAddFolder = async (formData: FormData) => {
    const addedFolder = await addNewFolder(formData);
    if (addedFolder) {
      console.log("successfully added new folder: ", addedFolder);
    }
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
          <Separator />
          <form action={handleAddFolder}>
            <Button
              className="w-full items-center text-xs"
              variant="outline"
              disabled={pending}
            >
              New Folder
            </Button>
          </form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
