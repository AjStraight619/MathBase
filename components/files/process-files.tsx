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
import { LocalFile } from "@/lib/types";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { RxStack } from "react-icons/rx";
import { Button } from "../ui/button";
import ProcessFileForm from "./process-files-form";
import UploadFiles from "./upload-files";

type ProcessFilesProps = {
  files: LocalFile[];
  setFiles: React.Dispatch<React.SetStateAction<LocalFile[]>>;
};

export default function ProcessFiles({ files, setFiles }: ProcessFilesProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          <DialogDescription className="text-xs text-gray-50/50">
            Select the files you want to process. The text will be extracted and
            added to the chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pb-[2rem]">
          <div className="grid flex-1 gap-2">
            {files.length ? (
              <ProcessFileForm
                files={files}
                setFiles={setFiles}
                setIsOpen={setIsOpen}
              />
            ) : (
              <div className="flex flex-row justify-start items-center">
                <span className="text-xs text-gray-50/50">
                  Click the icon to select files.{" "}
                </span>
                <span>
                  <UploadFiles files={files} setFiles={setFiles} />
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
