"use client";
import { useDialogTriggerContext } from "@/context/DialogTriggerContext";
import { Note } from "@/lib/types";
import { FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
type NotePreviewProps = {
  selectedNote: Note | null;
};

export default function NotePreview({ selectedNote }: NotePreviewProps) {
  const { handleDialogTrigger, isOpen } = useDialogTriggerContext();
  console.log(selectedNote?.content);
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogTrigger}>
      {/* <
    
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        onClick={handleDialogTrigger}
      > */}
      <FaEye className="text-muted-foreground/60" />
      {/* </> */}

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
