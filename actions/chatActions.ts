"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { ChatWithMessages } from "@/lib/types";
import { revalidatePath } from "next/cache";

type CompletionResponse = {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
  index: number;
};

export const getMostRecentChat = async () => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const mostRecentChat = await prisma.chat.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!mostRecentChat) return null;
  return mostRecentChat;
};

export const getChatMetaData = async () => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const chatMetaData = await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return chatMetaData;
};

export const getAllChats = async () => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const allChats = await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      messages: true,
    },
  });

  return allChats;
};

export const addExtractedTextToDb = async (
  chatId: string,
  extractedTexts: string[]
) => {
  const user = await getUserSession();
  if (!user) return null;

  extractedTexts.forEach(async (text) => {
    await prisma.chatMessage.create({
      data: {
        chatId,
        content: text,
        role: "user",
      },
    });
  });
  revalidatePath("/chat/");
};

export const getChatById = async (id: string) => {
  const user = await getUserSession();
  if (!user) return null;

  const chatById = (await prisma.chat.findUnique({
    where: {
      id: id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })) as unknown as ChatWithMessages;

  return chatById;
};

export const addExtractedEquationsToDb = async (
  data: CompletionResponse,
  chatId: string
) => {
  const user = await getUserSession();
  if (!user) return null;
  const { message } = data;
  const { content, role } = message;

  await prisma.chatMessage.create({
    data: {
      chatId,
      content,
      role,
      isExtractedEquation: true,
    },
  });

  let equationsArray: string[] = [];
  const equationsMatch = content.match(/\[(.*?)\]/);
  if (equationsMatch && equationsMatch[1]) {
    equationsArray = equationsMatch[1].split(",").map((eq) => eq.trim());
  }
  revalidatePath("/chat/");
  return equationsArray;
};

export const addChat = async (formData: FormData) => {
  const title = formData.get("title") as unknown as string;

  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const newChat = await prisma.chat.create({
    data: {
      title,
      user: {
        connect: { id: userId },
      },
    },
  });
  revalidatePath("/chat/");
  return newChat;
};

export const deleteChat = async (id: string) => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  // Delete associated chat messages
  await prisma.chatMessage.deleteMany({
    where: {
      chatId: id,
    },
  });

  await prisma.note.updateMany({
    where: {
      chatId: id,
    },
    data: {
      chatId: { set: null },
    },
  });

  await prisma.chat.delete({
    where: {
      id: id,
      userId: userId,
    },
  });

  revalidatePath("/chat/");
};
