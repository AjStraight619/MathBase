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

  const chat = await prisma.chat.create({
    data: {
      title: "AI Extracted Equations",
      user: {
        connect: { id: user.id },
      },
      messages: {
        create: [
          {
            content: "$x^2 + y^2 = z^2$, $\\sin(x) + \\cos(y)$",
            role: "assistant",
            isExtractedEquation: true,
          },
          {
            content: "$a^2 + b^2 = c^2$, $v = u + at$",
            role: "assistant",
            isExtractedEquation: true,
          },
          {
            content: "$\\int x \\, dx$ from 0 to 1, $\\frac{d}{dx} \\sin(x)$",
            role: "assistant",
            isExtractedEquation: true,
          },
          {
            content:
              "$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$, $F = m \\cdot a$",
            role: "assistant",
            isExtractedEquation: true,
          },
        ],
      },
    },
  });

  console.log(`Created chat with id: ${chat.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
