import { getMostRecentChatId } from "@/actions/chatActions";
import { getMostRecentNoteId } from "@/actions/noteActions";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import IsLoggedInActions from "@/components/home/logged-in-actions";
import WelcomeSection from "@/components/home/welcome-section";
import { footerData } from "@/lib/data";
import { getUserSession } from "@/lib/session";

export default async function Home() {
  const user = await getUserSession();
  const userId = user?.id;
  const mostRecentChatId = await getMostRecentChatId(userId);
  const mostRecentNoteId = await getMostRecentNoteId(userId);
  const userIsLoggedIn = !!user;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-24 bg-gradient-to-b from-black from-50% via-gray-700 via-80%  to-gray-300 to-100% ">
      <Header />
      {!userIsLoggedIn ? (
        <WelcomeSection />
      ) : (
        <IsLoggedInActions
          mostRecentChatId={mostRecentChatId}
          mostRecentNoteId={mostRecentNoteId}
        />
      )}
      <Features />
      <Footer footerData={footerData} />
    </main>
  );
}
