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

import { motion } from "framer-motion";

type NotePreviewProps = {
  noteInfo: Note | null;
  isNoteLoading: boolean;
  noteError: unknown;
};

export default function NotePreview({
  noteInfo,
  isNoteLoading,
  noteError,
}: NotePreviewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogTrigger = () => {
    setIsDialogOpen((prev) => !prev);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogTrigger}>
      <DialogTrigger asChild>
        <motion.button
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <FaEye className="text-muted-foreground/60" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between items-center">
        <DialogHeader className="text-center font-semibold">
          Note Preview
        </DialogHeader>

        {noteInfo?.content}

        <DialogFooter>
          <Button onClick={handleDialogTrigger}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
