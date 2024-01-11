"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFileContext } from "@/context/FileProvider";
import { useMathModeContext } from "@/context/MathModeProvider";

import { useAnimate } from "framer-motion";
import { useState } from "react";
import { RxStack } from "react-icons/rx";
import { Button } from "../ui/button";
import ProcessFileForm from "./process-files-form";
import UploadFiles from "./upload-files";

export default function ProcessFiles() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useFileContext();
  const { mathMode } = useMathModeContext();
  const [_, animate] = useAnimate();

  const handleDialogTrigger = () => {
    setIsOpen(!isOpen);
    const fileNames = state.map((file) => file.file.name);
    dispatch({
      type: "VIEWED_FILE",
      payload: fileNames,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={handleDialogTrigger}>
          <RxStack className="text-3xl hover:cursor-pointer pr-[0.5rem]" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            Process Files
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">
              Select the files you want to process. The text will be extracted
              and added to the chat.
            </span>
            {mathMode && (
              <>
                <span className="text-md text-primary">Math Mode: </span>
                <span className="text-xs text-muted-foreground">
                  Math Mode is enabled. Math mode will extract equations from
                  the files you submit for processing.
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pb-[2rem]">
          <div className="grid flex-1 gap-2">
            {state.length ? (
              <ProcessFileForm className="flex gap-2 items-center absolute bottom-6 right-4" />
            ) : (
              <div className="flex flex-row justify-start items-center">
                <span className="text-xs text-muted-foreground">
                  Click the icon to select files.{" "}
                </span>
                <span>
                  <UploadFiles />
                </span>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="flex flex-row sm:justify-start md:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
