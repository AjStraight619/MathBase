"use client";
import { Note, NoteContent } from "@prisma/client";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef, useState } from "react";

import { updateNoteContent } from "@/actions/noteActions";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  getDefaultKeyBindingFn,
  isBold,
  isH1,
  isItalic,
  isSub,
  isSup,
  isUL,
  isUnderline,
  shortcutHandler,
  toggleBold,
  toggleH1,
  toggleItalic,
  toggleSub,
  toggleSup,
  toggleUL,
  toggleUnderline,
} from "contenido";
import toast from "react-hot-toast";
import {
  FaBold,
  FaFileExport,
  FaHeading,
  FaItalic,
  FaList,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from "react-icons/fa";
import { Button } from "../ui/button";
import SubmitButton from "../ui/submit-button";

type NoteEditorProps = {
  note: (Note & { contents: NoteContent[] }) | null;
};

export default function NoteEditor({ note }: NoteEditorProps) {
  const initializeEditorState = () => {
    if (note && note.contents.length > 0 && note.contents[0].content) {
      try {
        const rawContent = JSON.parse(note.contents[0].content);
        const contentState = convertFromRaw(rawContent);
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error("Error initializing editor state:", error);
      }
    }
    return EditorState.createEmpty();
  };

  const [editorState, setEditorState] = useState(initializeEditorState);
  const [storedNote, setStoredNote] = useLocalStorage(
    "note",
    note?.contents[0]?.content
  );
  const [isExporting, setIsExporting] = useState(false);
  const textEditorRef = useRef(null);

  const toggleExport = () => {
    setIsExporting((prev) => !prev);
  };

  const handleSaveContent = async (formData: FormData) => {
    const content = editorState.getCurrentContent();

    if (!content.hasText()) {
      toast.error("No content to save.");
      return;
    }

    const rawContent = JSON.stringify(convertToRaw(content));

    formData.append("noteContent", rawContent);

    if (note && note.contents[0].id) {
      formData.append("noteContentId", note.contents[0].id);
    } else {
      toast.error("Can't find current note in our system");
      return;
    }

    const response = await updateNoteContent(formData);

    if (response) {
      const { error, success } = response;
      if (success) {
        toast.success("Successfully updated note");
      } else if (error) {
        toast.error(error);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  const toolbarButtons = [
    { name: "Bold", handler: toggleBold, detector: isBold, icon: FaBold },
    {
      name: "Italic",
      handler: toggleItalic,
      detector: isItalic,
      icon: FaItalic,
    },
    {
      name: "Underline",
      handler: toggleUnderline,
      detector: isUnderline,
      icon: FaUnderline,
    },
    { name: "Heading 1", handler: toggleH1, detector: isH1, icon: FaHeading },
    {
      name: "Superscript",
      handler: toggleSup,
      detector: isSup,
      icon: FaSuperscript,
    },
    {
      name: "Subscript",
      handler: toggleSub,
      detector: isSub,
      icon: FaSubscript,
    },
    {
      name: "List",
      handler: toggleUL,
      detector: isUL,
      icon: FaList,
    },
  ];

  const exportButtons = [
    {
      name: "Export",
      handler: toggleExport,
      detector: isExporting,
      icon: FaFileExport,
    },
  ];

  return (
    <>
      <div className="flex flex-row w-full justify-between p-1 border-b mb-2 border-primary-foreground">
        <div className="flex space-x-2">
          {toolbarButtons.map((btn) => (
            <Button
              key={btn.name}
              onMouseDown={(e) => {
                e.preventDefault();
                btn.handler(editorState, setEditorState);
              }}
              size="icon"
            >
              <btn.icon
                className={`${
                  btn.detector(editorState)
                    ? "text-sky-400"
                    : "text-primary-foreground"
                }`}
              />
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          {exportButtons.map((btn) => (
            <Button
              key={btn.name}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              size="icon"
            >
              <btn.icon />
            </Button>
          ))}
        </div>
      </div>
      <form action={handleSaveContent} className="relative">
        <div className="overflow-hidden border-2 rounded-md border-primary-foreground h-[80vh] p-1">
          <Editor
            ref={textEditorRef}
            spellCheck={true}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={shortcutHandler(setEditorState)}
            keyBindingFn={getDefaultKeyBindingFn}
          />
          <SubmitButton className="absolute bottom-2 right-2 z-50">
            Save
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
