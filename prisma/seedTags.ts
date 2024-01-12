import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

async function createTags() {
  const userEmail = "test@prisma.io";

  const user = (await prisma.user.findUnique({
    where: { email: userEmail },
  })) as User;

  if (!user) {
    throw new Error("User not found");
  }

  const notes = await getAllNotes(user.id);
  const noteIds = notes.map((note) => note.id);

  for (const noteId of noteIds) {
    await deleteTags(user.id, noteId);
  }

  const createNewTags = await prisma.tag.createMany({
    data: {
      name: "Calculus",
    },
  });
}

const deleteTags = async (userId: string, noteId: string) => {
  const deletedTags = await prisma.note.update({
    where: {
      userId: userId,
      id: noteId,
    },
    data: {
      tags: {
        deleteMany: {
          id: noteId,
        },
      },
    },
  });
  console.log(deletedTags);
};

const getAllNotes = async (userId: string) => {
  const allNotes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return allNotes;
};

createTags();
