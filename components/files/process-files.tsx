"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFileContext } from "@/context/FileProvider";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { RxStack } from "react-icons/rx";
import { Button } from "../ui/button";
import ProcessFileForm from "./process-files-form";
import UploadFiles from "./upload-files";

export default function ProcessFiles() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useFileContext();

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <RxStack
          className={`text-3xl hover:cursor-pointer pr-[0.5rem] ${
            state.length > 0 && !isOpen ? "animate-bounce" : ""
          }`}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            Process Files
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Select the files you want to process. The text will be extracted and
            added to the chat.
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
