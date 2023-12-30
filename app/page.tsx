import AnimatedCard from "@/components/home/animated-card";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { cardData, footerData } from "@/lib/data";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const userIsLoggedIn = !!user;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-24 bg-gradient-to-b from-black/90 from-70% to-gray-300 to-100%">
      <div className="flex items-center justify-center space-x-4 z-10">
        <Image
          src="/logo.png"
          alt="Math Base Logo"
          width={100}
          height={100}
          layout="fixed"
          priority={true}
          quality={100}
          className="rounded-full"
        />
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Math Base
        </h1>
      </div>

      {!userIsLoggedIn && (
        <div className="text-center mt-8">
          <p className="text-lg bg-clip-text bg-gradient-to-r from-primary to-muted">
            Welcome to Math Base - your personal math learning platform.
          </p>
          <div className="mt-4">
            <Button className="bg-primary py-2 px-4 rounded-md mr-2">
              Sign Up
            </Button>
            <Button className="bg-primary py-2 px-4 rounded-md">Sign In</Button>
          </div>
        </div>
      )}

      <div className="z-10">
        <div className="mb-16 grid text-center lg:grid-cols-4 lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left mt-32 ml-[8rem]">
          {cardData.map((card) => (
            <AnimatedCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <Features />

      <Footer footerData={footerData} />
    </main>
  );
}
