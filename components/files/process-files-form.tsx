import { useFileContext } from "@/context/FileProvider";
import { useFileManager } from "@/hooks/useFileManager";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../ui/submit-button";
import UploadFiles from "./upload-files";

type ProcessFileFormProps = {
  className?: string;
};

export default function ProcessFileForm({ className }: ProcessFileFormProps) {
  const { state, dispatch } = useFileContext();
  const { processFiles } = useFileManager();

  return (
    <form action={processFiles}>
      {state.map((file) => (
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
            onClick={() =>
              dispatch({ type: "TOGGLE_FILE", payload: file.file.name })
            }
          />
        </div>
      ))}
      <div className={className}>
        {state.length > 0 && <UploadFiles />}
        <SubmitButton disabled={state.length === 0}>Process Files</SubmitButton>
      </div>
    </form>
  );
}
