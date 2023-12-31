import { cardData } from "@/lib/data";
import Link from "next/link";
import AnimatedCard from "./animated-card";

export default function WelcomeSection() {
  return (
    <>
      <div className="text-center mt-8">
        <p className="text-lg bg-clip-text bg-gradient-to-r from-primary to-muted">
          Welcome to Math Base - your personal math learning platform.
        </p>
        <div className="flex flex-row gap-2 items-center justify-center mt-4">
          <Link
            href="/register"
            className="bg-primary-foreground opacity-80 py-2 px-4 rounded-md hover:opacity-100"
          >
            Sign Up
          </Link>
          <Link
            href="/sign-in"
            className="bg-primary-foreground opacity-80 py-2 px-4 rounded-md hover:opacity-100"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="z-10">
        <div className="mb-16 grid text-center lg:grid-cols-4 lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left mt-20">
          {cardData.map((card) => (
            <AnimatedCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}
