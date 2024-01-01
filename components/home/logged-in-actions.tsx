"use client";
import { User } from "@prisma/client";
import { useAnimate } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import UserActionCard from "./user-action-card";

type IsLoggedInActionsProps = {
  mostRecentChatId: string | undefined;
};

export default function IsLoggedInActions({
  mostRecentChatId,
}: IsLoggedInActionsProps) {
  const { data: session, status } = useSession();
  const [scope, animate] = useAnimate();

  const user = session?.user as User;
  const userName = user?.name;

  const loggedInPaths = [
    {
      name: "Dashboard",
      route: "/dashboard",
      description: "View your dashboard",
    },
    {
      name: "Chats",
      route: `/chat/${mostRecentChatId}`,
      description: "View your chats",
    },
  ];

  useEffect(() => {
    const handleAnimate = async () => {
      if (scope.current && status === "authenticated") {
        await animate(
          "#welcome",
          { x: [-100, 0] },
          {
            duration: 0.5,
          }
        );
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
          <h1 id="welcome" className="text-2xl font-semibold text-center">
            Welcome back, {userName}!
          </h1>
          <div className="flex flex-row gap-2 items-center justify-center mt-2">
            {loggedInPaths.map((path) => (
              <UserActionCard key={path.name} {...path} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
