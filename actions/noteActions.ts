"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

export const getAllNotes = async () => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const allNotes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return allNotes;
};

export const addNote = async (formData: FormData) => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const title = formData.get("title") as string;

  const note = await prisma.note.create({
    data: {
      title: title,
      userId: userId,
      chatId: "",
      content: "",
    },
  });

  return note;
};

export const addNoteContent = async (formData: FormData) => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const noteId = formData.get("noteId") as string;
  const content = formData.get("content") as string;

  const note = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      content: content,
    },
  });

  return note;
};

export const getAllFolders = async () => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const allFolders = await prisma.folder.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      notes: {
        select: {
          id: true,
          title: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });
  return allFolders;
};
