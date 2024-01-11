import { Note } from "@/lib/types";

type NoteEditorProps = {
  note: Note | null;
};

export default function NoteEditor({ note }: NoteEditorProps) {
  return (
    <div className={`flex items-center justify-center h-screen w-full mx-auto`}>
      This page is currently in production
    </div>
  );
}
