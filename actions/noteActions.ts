"use server";

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const getAllNotes = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = session?.user as User;
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
