import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NoteEditor = dynamic(
  () => import("@/components/note-interface/note-editor"),
  {
    ssr: false,
  }
);

const getNoteById = async (id: string) => {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      contents: true,
    },
  });

  return note;
};

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const note = await getNoteById(id);
  return (
    <div className="h-screen justify-center items-center flex flex-col">
      <h1 className="text-xl text-muted-foreground mt-2">{note?.title}</h1>
      <div className="w-1/2">
        <Suspense fallback={<div>Loading...</div>}>
          <NoteEditor note={note} />
        </Suspense>
      </div>
    </div>
  );
}
