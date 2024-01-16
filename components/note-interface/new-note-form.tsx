"use client";
import { addNote } from "@/actions/noteActions";
import { AllFolders, LocalFile } from "@/lib/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import ProcessFileForm from "../files/process-files-form";
import UploadFiles from "../files/upload-files";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../ui/submit-button";
import SelectFolder from "./select-folder";

type NoteForm = {
  title: string;
  file?: LocalFile;
};

type NewNoteFormProps = {
  className?: string;
  allFolders: AllFolders[];
};

export default function NewNoteForm({
  className,
  allFolders,
}: NewNoteFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteForm, setNoteForm] = useState<NoteForm>({
    title: "",
    file: undefined,
  });

  const [selectedFolder, setSelectedFolder] = useState<AllFolders | null>(null);

  const handleAddNote = async (formData: FormData) => {
    formData.append("title", noteForm.title);
    if (selectedFolder?.id) {
      formData.append("folderId", selectedFolder?.id);
    } else {
      toast.error("Please select a folder");
    }
    await addNote(formData);
    setIsOpen(false);
    toast.success("Note added successfully!");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoteForm({ ...noteForm, [name]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`w-full mb-4 justify-evenly ${className}`}>
          New Note
          <FiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col min-h-[15rem]">
        <DialogTitle className="text-center">New Note</DialogTitle>

        <form action={handleAddNote}>
          <Label htmlFor="title">Title</Label>

          <Input
            id="title"
            name="title"
            value={noteForm.title}
            onChange={handleTitleChange}
          />

          <Label htmlFor="file">
            <div className="flex flex-row gap-2 mt-2">
              <span>File </span>
              <span className="text-muted-foreground text-xs">(Optional)</span>
              <UploadFiles className="w-5 h-5" />
            </div>
          </Label>
          <div className="absolute bottom-6 right-6">
            <div className="flex flex-row gap-2 items-center justify-center">
              <SelectFolder
                allFolders={allFolders}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
              />
              <SubmitButton variant="secondary" className="mt-2">
                Add Note
              </SubmitButton>
            </div>
          </div>
        </form>
        <div className="absolute bottom-6 left-6">
          <ProcessFileForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
