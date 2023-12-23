"use client";
import { UploadIcon } from "@/components/ui/upload-icon";
import { useFileManager } from "@/hooks/useFileManager";
import { LocalFile } from "@/lib/types";
import React, { useRef } from "react";

type UploadFilesProps = {
  className?: string;
  files: LocalFile[];
  setFiles: React.Dispatch<React.SetStateAction<LocalFile[]>>;
};

export default function UploadFiles({
  className,
  files,
  setFiles,
}: UploadFilesProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { addFiles } = useFileManager({ files, setFiles });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = event.target.files;
      const fileArray: LocalFile[] = Array.from(fileList).map((file) => ({
        file,
        checked: true,
      }));
      console.log("fileArray", fileArray);
      addFiles(fileArray);
    }
  };

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileChange}
        multiple
        hidden
      />
      <UploadIcon onClick={handleClick} className={className} />
    </>
  );
}
