"use server";

import { authOptions } from "@/lib/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

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
  const user = session?.user as User;
  const userId = user.id;

  const allChats = await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return allChats;
};
