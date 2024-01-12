"use client";
import { Note } from "@/lib/types";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
type NotePreviewProps = {
  selectedNote: Note | null;
};

export default function NotePreview({ selectedNote }: NotePreviewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogTrigger = () => {
    setIsDialogOpen((prev) => !prev);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogTrigger}>
      <DialogTrigger>
        <FaEye className="text-muted-foreground/60" />
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between items-center">
        <DialogHeader className="text-center font-semibold">
          Note Preview
        </DialogHeader>

        {selectedNote?.content}

        <DialogFooter>
          <Button onClick={handleDialogTrigger}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
