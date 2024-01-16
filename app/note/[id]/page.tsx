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
    <div className="flex flex-col items-center min-h-screen px-2">
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="text-xl text-muted-foreground mt-4 mb-2">
          {note?.title}
        </h1>
        <div className="w-full h-full lg:max-w-[calc(100vh*0.707)] lg:max-h-screen mx-auto overflow-hidden">
          <NoteEditor note={note} />
        </div>
      </Suspense>
    </div>
  );
}
