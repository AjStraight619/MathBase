"use server";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { Note, NoteContent, Tag } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getAllNotes = async (): Promise<
  (Note & { contents: NoteContent[]; tags: Tag[] })[] | null
> => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const allNotes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    include: {
      tags: true,
      contents: {
        select: {
          id: true,
          noteId: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      },
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
  const folderId = formData.get("folderId") as string;

  const note = await prisma.note.create({
    data: {
      title: title,
      userId: userId,
      folderId: folderId,
      chatId: "",
      contents: {
        create: {
          content: "",
        },
      },
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/note");
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
          contents: {
            select: {
              content: true,
            },
          },
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
  const messageContent = formData.get("messageContent") as string;
  console.log("messageContent", messageContent);

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

    const noteContent = await prisma.noteContent.create({
      data: {
        noteId: selectedNoteId,
        content: messageContent,
      },
    });

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

export const updateNoteContent = async (formData: FormData) => {
  const noteContentId = formData.get("noteContentId") as string;
  const newContent = formData.get("noteContent") as string; // Ensure this matches the form data key

  try {
    const updatedNoteContent = await prisma.noteContent.update({
      where: {
        id: noteContentId,
      },
      data: {
        content: newContent,
      },
    });

    if (updatedNoteContent) {
      return { error: null, success: true };
    }

    revalidatePath("/notes");
    return { error: "No content was updated", success: false };
  } catch (error) {
    return {
      error: "Failed to update note content",
      success: false,
    };
  }
};

export const addNewFolder = async (formData: FormData) => {
  const user = await getUserSession();
  const userId = user?.id;
  const newFolder = await prisma.folder.create({
    data: {
      title: "New Folder",
      userId: userId,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/note");
  revalidatePath("/chat");

  if (newFolder) {
    console.log("Successfully created new folder: ", newFolder);
  }

  return newFolder;
};
