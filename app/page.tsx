import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import IsLoggedInActions from "@/components/home/logged-in-actions";
import WelcomeSection from "@/components/home/welcome-section";
import { authOptions } from "@/lib/authOptions";
import { footerData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

const getMostRecentChatId = async (userId: string) => {
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

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const userId = user?.id;
  const mostRecentChatId = await getMostRecentChatId(userId);
  const userIsLoggedIn = !!user;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-24 bg-gradient-to-b from-black from-50% via-gray-700 via-80%  to-gray-300 to-100% ">
      <Header />
      {!userIsLoggedIn ? (
        <WelcomeSection />
      ) : (
        <IsLoggedInActions mostRecentChatId={mostRecentChatId} />
      )}
      <Features />
      <Footer footerData={footerData} />
    </main>
  );
}
