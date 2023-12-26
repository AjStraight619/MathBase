"use server";

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { ChatWithMessages } from "@/lib/types";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = session?.user as User;
  return user;
};

export const getMostRecentChat = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const userId = user.id;

  const mostRecentChat = await prisma.chat.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return mostRecentChat;
};

export const getChatMetaData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = session?.user as User;
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
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = session?.user as User;
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
  const session = await getServerSession(authOptions);
  if (!session) return;
  const user = session.user as User;
  const userId = user.id;
  if (!userId || !chatId) return;

  extractedTexts.forEach(async (text) => {
    const addedText = await prisma.chatMessage.create({
      data: {
        chatId,
        content: text,
        role: "user",
      },
    });
    console.log("This is the added text: ", addedText);
  });
  revalidatePath("/chat/");
};

export const getChatById = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

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

export const addChat = async (formData: FormData) => {
  const title = formData.get("title") as unknown as string;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const user = session.user as User;
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
  const user = await getUser();
  if (!user) return;
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
