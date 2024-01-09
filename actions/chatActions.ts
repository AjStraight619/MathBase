"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

type CompletionResponse = {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
  index: number;
};

/**
 * Fetches the most recent chat for the current user.
 * @returns {Promise<ChatWithMessages | null>} The most recent chat or null if not found.
 */

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

/**
 * Retrieves metadata for all chats belonging to the current user.
 * @returns {Promise<Array>} An array of chat metadata.
 */

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

/**
 * Fetches the most recent chat ID for the current user.
 * @returns {Promise<string | null>} The most recent chat ID or null if not found.
 */

export const getMostRecentChatId = async (userId: string) => {
  const mostRecentChat = await prisma.chat.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });

  return mostRecentChat?.id;
};

/**
 * Fetches all chats along with their messages for the current user.
 * @returns {Promise<Array>} An array of all chats with their messages.
 */
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

/**
 * Adds extracted text as new messages in the database.
 * @param {string} chatId - The ID of the chat to which the text is added.
 * @param {string[]} extractedTexts - The extracted texts to be added.
 */
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

/**
 * Fetches a specific chat by its ID, including the addedToNote status for each message.
 * @param {string} chatId - The ID of the chat to fetch.
 * @param {string | undefined} selectedNoteId - The ID of the selected note, if any.
 * @returns {Promise<Object | null>} The chat data including messages with addedToNote status, or null if not found.
 */
export async function getChatById(
  chatId: string,
  selectedNoteId: string | undefined
) {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      messages: {
        include: {
          mathResponse: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!chat) return null;
  const messagesWithAddedToNote = await Promise.all(
    chat.messages.map(async (message) => {
      const addedToNote =
        (await prisma.noteMessage.count({
          where: {
            messageId: message.id,
            noteId: selectedNoteId,
          },
        })) > 0;

      return {
        ...message,
        addedToNote: addedToNote,
      };
    })
  );

  return {
    ...chat,
    messages: messagesWithAddedToNote,
  };
}

/**
 * Adds extracted equations from completion responses to the database.
 * @param {CompletionResponse} data - The completion response data containing equations.
 * @param {string} chatId - The ID of the chat where equations are added.
 * @returns {Promise<Array>} An array of extracted equations.
 */
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

/**
 * Creates a new chat.
 * @param {FormData} formData - The form data containing chat information.
 * @returns {Promise<Object | null>} The newly created chat or null if creation fails.
 */
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

/**
 * Deletes a chat and its associated messages.
 * @param {string} id - The ID of the chat to be deleted.
 * @returns {Promise<void>}
 */
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

export const addMathResponseToChat = async (
  chatId: string,
  mathResponse: any
) => {
  const user = await getUserSession();
  if (!user) return null;
  const userId = user.id;

  const newChat = await prisma.chat.create({
    data: {
      title: "Math Response",
      user: {
        connect: { id: userId },
      },
    },
  });
  revalidatePath("/chat/");
  return newChat;
};
