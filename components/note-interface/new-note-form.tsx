import { addNote } from "@/actions/noteActions";
import { useFileContext } from "@/context/FileProvider";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type NoteForm = {
  title: string;
  file?: File;
};

export default function NewNoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [noteForm, setNoteForm] = useState<NoteForm>({
    title: "",
    file: undefined,
  });

  const { files, setFiles } = useFileContext();

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Note</DialogTitle>
        <form action={handleAddNote}>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={noteForm.title}
            onChange={handleTitleChange}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
