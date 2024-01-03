"use client";
import { Note } from "@prisma/client";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import FroalaEditor from "react-froala-wysiwyg";

type NoteEditorProps = {
  note: Note | null;
};

export default function NoteEditor({ note }: NoteEditorProps) {
  return (
    <div className={`flex items-center justify-center h-screen w-full mx-auto`}>
      <FroalaEditor
        model={note?.content}
        onModelChange={() => {
          console.log("changed");
        }}
        tag="textarea"
        config={{
          placeholderText: "Edit Your Content Here!",
          charCounterCount: true,
        }}
      />
    </div>
  );
}
