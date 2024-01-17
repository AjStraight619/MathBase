"use client";
import { addNewFolder } from "@/actions/noteActions";
import { Folder } from "@/lib/types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import DropdownButton from "../ui/dropdown-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import SubmitButton from "../ui/submit-button";

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
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleFolderSelect = (folder: Folder) => {
    setSelectedFolder(folder);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFolderTitle = e.target.value;
    if (isDuplicateFolderTitle(newFolderTitle)) {
      setValidationMessage("Folder name already exists");
    } else {
      setValidationMessage("");
    }
  };

  const handleAddFolder = async (formData: FormData) => {
    const folderTitle = formData.get("folderTitle") as string;
    if (!isDuplicateFolderTitle(folderTitle)) {
      const { success, error } = await addNewFolder(formData);
      setIsAddingFolder(false);
      if (success) {
        toast.success("Successfully created new folder");
        formRef?.current?.reset();
      } else {
        toast.error(error);
      }
    } else {
      toast.error("Choose a different folder name");
      formRef?.current?.reset();
    }
  };

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
    setIsAddingFolder(false);
  };

  const isDuplicateFolderTitle = (folderTitle: string) => {
    return allFolders.some(
      (folder) => folder.title.toLowerCase() === folderTitle.toLowerCase()
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
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
      <DropdownMenuContent className="min-w-[16rem]">
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
          {isAddingFolder && isOpen ? (
            <form
              ref={formRef}
              action={handleAddFolder}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  name="folderTitle"
                  onChange={handleInputChange}
                  className="flex-1"
                />
                <SubmitButton
                  size="icon"
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <FaPlus />
                </SubmitButton>
              </div>
              {validationMessage && (
                <p className="text-red-500 text-xs">{validationMessage}</p>
              )}
            </form>
          ) : (
            <Button
              className="w-full items-center text-xs"
              variant="outline"
              onClick={() => setIsAddingFolder(true)}
            >
              New Folder
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
