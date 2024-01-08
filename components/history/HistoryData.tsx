import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

const getUserHistory = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  const userChatHistory = await prisma.chat.count({
    where: {
      userId: userId,
    },
  });
  return userChatHistory;
};

export default async function HistoryData() {
  const userChatHistory = await getUserHistory();
  return <div>{userChatHistory}</div>;
}
