import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import IsLoggedInActions from "@/components/home/logged-in-actions";
import WelcomeSection from "@/components/home/welcome-section";
import { authOptions } from "@/lib/authOptions";
import { footerData } from "@/lib/data";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const userIsLoggedIn = !!user;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-24 bg-gradient-to-b from-black/90 from-80%  via-gray-400 via-95% to-gray-200 to-100%">
      <Header />
      {!userIsLoggedIn ? <WelcomeSection /> : <IsLoggedInActions />}

      <Features />

      <Footer footerData={footerData} />
    </main>
  );
}
