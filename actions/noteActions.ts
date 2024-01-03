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

/**
 * Adds a chat message to a note.
 * @param {FormData} formData - The form data containing the message and note IDs.
 * @returns {Promise<{error: string | null, noteMessage: Object | null}>}
 *          An object indicating the error status and the created NoteMessage object, if any.
 */
export const addChatContentToNote = async (formData: FormData) => {
  const user = await getUserSession();

  if (!user) {
    return {
      error: "User not authenticated",
      noteMessage: null,
    };
  }

  const selectedNoteId = formData.get("selectedNoteId") as string;
  const messageId = formData.get("messageId") as string;
  const exists = await checkChatMessageInNoteExists(selectedNoteId, messageId);
  if (exists) {
    console.log("Message already exists in note");
    return {
      error: "Message already exists in note",
      noteMessage: null,
    };
  }

  try {
    const noteMessage = await prisma.noteMessage.create({
      data: {
        noteId: selectedNoteId,
        messageId: messageId,
      },
    });

    console.log("Added message to note", noteMessage);
    return {
      error: null,
      noteMessage: noteMessage,
    };
  } catch (error) {
    console.error("Error adding message to note:", error);
    return {
      error: "Failed to add message to note",
      noteMessage: null,
    };
  }
};

export const getMostRecentNoteId = async (userId: string) => {
  const mostRecentNote = await prisma.note.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return mostRecentNote?.id;
};

const checkChatMessageInNoteExists = async (
  noteId: string,
  messageId: string
) => {
  const count = await prisma.noteMessage.count({
    where: {
      noteId: noteId,
      messageId: messageId,
    },
  });
  return count > 0;
};

export const getMostRecentNoteMetaData = async () => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const mostRecentNote = await prisma.note.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
    },
  });

  return {
    id: mostRecentNote?.id,
    title: mostRecentNote?.title,
  };
};
