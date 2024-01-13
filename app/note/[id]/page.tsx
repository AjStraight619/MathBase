import { prisma } from "@/lib/prisma";

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
    <div className="h-screen justify-start items-center flex flex-col">
      <h1 className="text-xl text-muted-foreground mt-2">{note?.title}</h1>
    </div>
  );
}
