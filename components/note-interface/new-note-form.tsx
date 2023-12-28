import { addNote } from "@/actions/noteActions";
import { useFileContext } from "@/context/FileProvider";
import { LocalFile } from "@/lib/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import ProcessFileForm from "../files/process-files-form";
import UploadFiles from "../files/upload-files";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../ui/submit-button";

type NoteForm = {
  title: string;
  file?: LocalFile;
};

export default function NewNoteForm({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noteForm, setNoteForm] = useState<NoteForm>({
    title: "",
    file: undefined,
  });

  const { state, dispatch } = useFileContext();

  const handleAddNote = async (formData: FormData) => {
    formData.append("title", noteForm.title);
    await addNote(formData);
    setIsOpen(false);
    toast.success("Note added successfully!");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoteForm({ ...noteForm, [name]: value });
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const localFile = { file: file, checked: false };
      setNoteForm({ ...noteForm, file: localFile });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`w-full mb-4 justify-evenly ${className}`}>
          New Note
          <FiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
            <span>File </span>
            <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <SubmitButton variant="secondary" className="mt-2">
            Add Note
          </SubmitButton>
        </form>
        <DialogFooter className="flex flex-row gap-2 item-center justify-center">
          <UploadFiles />
          <ProcessFileForm />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
