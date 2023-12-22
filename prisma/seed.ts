const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const userEmail = "test@prisma.io";

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const folders = await Promise.all(
    ["Work", "Personal", "Ideas"].map((folderName) => {
      return prisma.folder.create({
        data: {
          title: folderName,
          user: {
            connect: { id: user.id },
          },
        },
      });
    })
  );

  const tags = await Promise.all(
    ["Urgent", "Education", "Hobbies"].map((tagName) => {
      return prisma.tag.create({
        data: {
          name: tagName,
        },
      });
    })
  );

  for (let i = 1; i <= 3; i++) {
    const chat = await prisma.chat.create({
      data: {
        title: `Chat ${i}`,
        user: {
          connect: { id: user.id },
        },
        messages: {
          create: [
            {
              content: `Message 1 in Chat ${i}`,
              role: "user",
            },
            {
              content: `Message 2 in Chat ${i}`,
              role: "assistant",
            },
          ],
        },
      },
    });

    console.log(`Created chat with id: ${chat.id}`);

    for (let j = 1; j <= 6; j++) {
      for (const folder of folders) {
        const note = await prisma.note.create({
          data: {
            title: `Note ${j} for Folder ${folder.title}`,
            content: `This is note ${j} in folder ${folder.title}`,
            user: {
              connect: { id: user.id },
            },
            chat: {
              connect: { id: chat.id },
            },
            folder: {
              connect: { id: folder.id },
            },
            tags: {
              connect: tags.map((tag) => ({ id: tag.id })), // Connect all tags to each note
            },
          },
        });

        console.log(
          `Created note with id: ${note.id} in folder ${folder.title}`
        );
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
