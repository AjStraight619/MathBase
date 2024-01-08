import { useMathModeContext } from "@/context/MathModeProvider";
import { useEffect, useRef } from "react";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import ProcessFiles from "../files/process-files";
import UploadFiles from "../files/upload-files";
import { Textarea } from "../ui/textarea";

type MessageInputProps = {
  input: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    isMathSymbol: boolean
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  showMathKeyboard: boolean;
  toggleMathKeyboard: () => void;
};

export default function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  toggleMathKeyboard,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mathMode } = useMathModeContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="flex items-center justify-center">
        <ProcessFiles />
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center relative sm:w-3/4 md:w-2/3 lg:w-1/2"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => handleInputChange(e, false)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-[52px] min-h-[52px] max-h-[200px] outline-none border rounded-xl pt-[0.8rem] pl-[1.5rem] pr-[2rem] sm:w-3/4 md:w-2/3 lg:w-1/2 bg-primary-foreground overflow-hidden resize-none placeholder:text-base text-base"
            placeholder="Message Note Genius..."
          />
          <button disabled={isLoading} type="submit">
            <BiSolidUpArrowCircle
              className={`${
                isLoading ? "text-muted-foreground" : ""
              } w-6 h-6 absolute bottom-3 right-1`}
            />
          </button>
          <UploadFiles className="absolute left-0" />
        </form>
        <div className="ml-1">
          {mathMode && (
            <FaCalculator
              className="w-6 h-6 hover:cursor-pointer opacity-40 hover:opacity-100"
              onClick={toggleMathKeyboard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
