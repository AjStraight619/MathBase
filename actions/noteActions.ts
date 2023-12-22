"use server";

import { getUserSession } from "./session";

export const getAllNotes = async () => {
  const userId = await getUserSession();

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
