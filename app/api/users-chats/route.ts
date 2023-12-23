import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the GET request to retrieve chat messages for a specific chat session.
 * Requires an authenticated session to access the chat messages.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {NextResponse} - A JSON response containing the chat messages or an error message.
 */

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No Valid Session" });
  }

  const chatId = req.nextUrl.searchParams.get("chatId") as unknown as string;

  const chatMessages = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return NextResponse.json(chatMessages);
}

/**
 * Handles the POST request to add new messages to a specific chat session.
 * The function expects a JSON payload containing the chat ID and the new messages to be added.
 * The messages are sorted to prioritize user messages and then saved to the database.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {NextResponse} - A JSON response confirming the addition of the messages.
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { chatId, conversationUpdate } = data;

  conversationUpdate.sort((a: any, b: any) => (a.role === "user" ? -1 : 1));

  for (const message of conversationUpdate) {
    const { role, content } = message;

    // Process the message
    await prisma.chatMessage.create({
      data: {
        chatId: chatId,
        role: role,
        content: content,
      },
    });
  }

  return NextResponse.json(conversationUpdate);
}
