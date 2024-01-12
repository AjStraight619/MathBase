import { Chat, ChatMessage } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AllFolders } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const sortByMostRecent = (
  a: { updatedAt: Date },
  b: { updatedAt: Date }
) => {
  if (a.updatedAt > b.updatedAt) {
    return -1;
  } else if (a.updatedAt < b.updatedAt) {
    return 1;
  } else {
    return 0;
  }
};
export const convertLatexToWolframQuery = (latex: string): string => {
  let query = latex;

  query = query
    .replace(/\\int/g, "integrate")
    .replace(/\\sum/g, "sum")
    .replace(/\\frac{(.+?)}{(.+?)}/g, "($1)/($2)");

  return query;
};

export const containsMarkdown = (content: string) => {
  const markdownPatterns = /(\*|_|`|\$|\[|\]|\(|\)|\!\[|\]\(|\$\$)/;
  return markdownPatterns.test(content);
};

export const filterForSelectedNote = (
  allFolders: AllFolders[],
  selectedNoteId: string | null
) => {
  if (!selectedNoteId) {
    return null;
  }
  const selectedNote = allFolders
    .map((folder) => folder.notes)
    .flat()
    .find((note) => note.id === selectedNoteId);
  return selectedNote;
};

export const processChartData = (
  chats: (Chat & { messages: ChatMessage[] })[]
) => {
  const chatCountPerDay: { [key: string]: number } = {};

  chats.forEach((chat) => {
    const day = getDay(chat.createdAt);

    chatCountPerDay[day] = (chatCountPerDay[day] || 0) + 1;
  });

  const sortedData = Object.entries(chatCountPerDay)
    .map(([date, count]) => ({
      date: date,
      count: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((dataPoint) => {
      const [year, month, day] = dataPoint.date.split("-");
      return {
        ...dataPoint,
        date: `${month}-${day}`,
      };
    });

  return sortedData;
};

const getDay = (date: Date) => {
  return date.toISOString().split("T")[0];
};
