import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const noteId = req.nextUrl.searchParams.get("noteId") as unknown as string;

  const noteInfo = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      chat: {
        include: {
          messages: true,
        },
      },
    },
  });

  console.log("This is the noteInfo: ", noteInfo);

  return NextResponse.json(noteInfo);
}
