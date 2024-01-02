import { useMathModeContext } from "@/context/MathModeProvider";
import { useSidebarContext } from "@/context/SidebarContext";
import { containerVariants } from "@/lib/animationVariants";
import { motion } from "framer-motion";
import { useRef } from "react";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import ProcessFiles from "../files/process-files";
import UploadFiles from "../files/upload-files";
import Calculator from "../math/calculator";
import { Textarea } from "../ui/textarea";

type MessageInputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export default function MessageInput({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  isLoading,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isSidebarOpen } = useSidebarContext();
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

  // const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = e.target;
  //   setInput(value);
  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.style.height = "auto";
  //     textarea.offsetHeight;
  //     textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  //   }
  // };

  return (
    <motion.div
      variants={containerVariants}
      initial="closed"
      animate={isSidebarOpen ? "open" : "closed"}
      className="fixed bottom-5 left-0 right-0 mx-auto w-full max-w-xl"
    >
      <div className="flex items-center justify-center">
        <ProcessFiles />
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center relative sm:w-3/4 md:w-2/3 lg:w-1/2"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
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
        <div className="ml-1">{mathMode && <Calculator />}</div>
      </div>
    </motion.div>
  );
}
