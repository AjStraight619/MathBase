"use client";
import { User } from "@prisma/client";
import { useAnimate } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { UserAvatar } from "../avatar/avatars";
import { Skeleton } from "../ui/skeleton";

export default function IsLoggedInActions() {
  const { data: session, status } = useSession();
  const [scope, animate] = useAnimate();

  const user = session?.user as User;
  const userName = user?.name;

  const h1Props = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  useEffect(() => {
    const handleAnimate = async () => {
      console.log("Effect running");
      if (scope.current && status === "authenticated") {
        console.log("Scope is available");

        console.log("Starting animation");
        await animate("#welcome", { opacity: 1, x: 0 }, { duration: 0.5 });
        await animate("#avatar", { x: 0 }, { duration: 1, ease: "easeInOut" });
      }
    };

    handleAnimate();
  }, [animate, scope, status]);

  return (
    <div ref={scope}>
      {status === "loading" ? (
        <Skeleton />
      ) : session ? (
        <div className="flex flex-col gap-2 mt-10">
          <h1 id="welcome" className="text-2xl font-semibold">
            Welcome back, {userName}!
          </h1>
          <span id="avatar">
            <UserAvatar />
          </span>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      ) : null}
    </div>
  );
}
