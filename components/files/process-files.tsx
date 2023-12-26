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
  const { files } = useFileContext();

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <RxStack
          className={`text-3xl hover:cursor-pointer pr-[0.5rem] ${
            files.length > 0 && !isOpen ? "animate-bounce" : ""
          }`}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            Process Files
          </DialogTitle>
          <DialogDescription className="text-xs text-black">
            Select the files you want to process. The text will be extracted and
            added to the chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pb-[2rem]">
          <div className="grid flex-1 gap-2">
            {files.length ? (
              <ProcessFileForm setIsOpen={setIsOpen} />
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
