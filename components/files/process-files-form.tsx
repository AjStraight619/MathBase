import { addExtractedTextToDb } from "@/actions/chatActions";
import { useFileManager } from "@/hooks/useFileManager";
import { useItemId } from "@/hooks/useItemId";
import { LocalFile } from "@/lib/types";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../ui/submit-button";
import UploadFiles from "./upload-files";

type ProcessFileFormProps = {
  files: LocalFile[];
  setFiles: React.Dispatch<React.SetStateAction<LocalFile[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProcessFileForm({
  files,
  setFiles,
  setIsOpen,
}: ProcessFileFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const chatId = useItemId();
  const { toggleFileChecked } = useFileManager({
    files,
    setFiles,
  });

  const processFiles = async (formData: FormData) => {
    files.forEach((file) => {
      formData.append("file", file.file);
    });
    const res = await fetch(`/api/parse-file`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error(`Error parsing file`);
    }
    const data = await res.json();
    const { extractedTexts, success } = data;
    if (!success) {
      throw new Error(`Error parsing file`);
    } else {
      await addExtractedTextToDb(chatId ?? "", extractedTexts);
    }
    setIsOpen(false);
  };

  return (
    <form action={processFiles}>
      {files.map((file) => (
        <div key={file.file.name} className="flex items-center space-x-2">
          <Label htmlFor="file" className="sr-only">
            File
          </Label>
          <Input
            id="file"
            defaultValue={file.file.name}
            readOnly
            className="flex-1"
          />
          <Checkbox
            checked={file.checked}
            onClick={() => toggleFileChecked(file.file.name)}
          />
        </div>
      ))}
      <div className="flex gap-2 items-center absolute bottom-2 right-2">
        {files.length > 0 && <UploadFiles files={files} setFiles={setFiles} />}
        <SubmitButton>Process File</SubmitButton>
      </div>
    </form>
  );
}
