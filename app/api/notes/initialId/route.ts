import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user?.id) {
      return new NextResponse(null, { status: 401 });
    }

    const mostRecentNote = await prisma.note.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ noteId: mostRecentNote?.id || "" });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
