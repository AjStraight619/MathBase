"use client";
import { useDialogTriggerContext } from "@/context/DialogTriggerContext";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

export default function NotePreview() {
  const { handleDialogTrigger, isOpen } = useDialogTriggerContext();

  const dialogVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 5 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogTrigger}>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        onClick={handleDialogTrigger}
      >
        <FaEye className="text-muted-foreground/60" />
      </motion.button>

      <DialogContent>
        <DialogHeader>Note Preview</DialogHeader>
        This is the note Dialog
        <DialogFooter>
          <Button onClick={handleDialogTrigger}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
