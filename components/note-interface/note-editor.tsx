"use client";
import { Note, NoteContent } from "@prisma/client";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef, useState } from "react";

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

type NoteEditorProps = {
  note: (Note & { contents: NoteContent[] }) | null;
};

export default function NoteEditor({ note }: NoteEditorProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [storedNote, setStoredNote] = useLocalStorage("note", note);
  const [isExporting, setIsExporting] = useState(false);
  const textEditorRef = useRef(null);

  const toggleExport = () => {
    setIsExporting((prev) => !prev);
  };

  console.log(note?.contents[0]?.content);

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
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row w-full rounded-sm border border-primary-foreground justify-between p-1">
          <div className="space-x-2">
            {toolbarButtons.map((btn) => (
              <Button
                key={btn.name}
                onMouseDown={(e) => {
                  e.preventDefault();
                  btn.handler(editorState, setEditorState);
                }}
                size="icon"
              >
                {
                  <btn.icon
                    className={`${
                      btn.detector(editorState)
                        ? "text-sky-400"
                        : "text-primary-foreground"
                    }`}
                  />
                }
              </Button>
            ))}
          </div>
          <div className="space-x-2">
            {exportButtons.map((btn) => (
              <Button
                key={btn.name}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                size="icon"
              >
                {<btn.icon />}
              </Button>
            ))}
          </div>
        </div>

        <div className="border-2 rounded-m border-primary-foreground h-[400px] p-1">
          <Editor
            ref={textEditorRef}
            spellCheck={true}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={shortcutHandler(setEditorState)}
            keyBindingFn={getDefaultKeyBindingFn}
          />
        </div>
      </div>
    </>
  );
}
