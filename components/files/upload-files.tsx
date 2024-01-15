"use client";
import { UploadIcon } from "@/components/ui/upload-icon";
import { useFileContext } from "@/context/FileProvider";
import useLocalStorage from "@/hooks/useLocalStorage";

import { LocalFile } from "@/lib/types";
import React, { useRef } from "react";

type UploadFilesProps = {
  className?: string;
};

export default function UploadFiles({ className }: UploadFilesProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useFileContext();
  const [storedValue, setValue] = useLocalStorage<LocalFile[]>("files", []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = event.target.files;
      const fileArray: LocalFile[] = Array.from(fileList).map((file) => ({
        file,
        checked: true,
        isViewed: false,
      }));

      dispatch({ type: "ADD_FILE", payload: fileArray });

      const updatedFiles = storedValue
        ? [...storedValue, ...fileArray]
        : fileArray;
      setValue(updatedFiles);
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
