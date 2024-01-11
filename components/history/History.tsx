"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

type UserHistory = {
  userChatHistory: number;
};

export default function History({ userChatHistory }: UserHistory) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const userName = user?.name;
  const { isSidebarOpen } = useSidebarContext();

  return (
    <div className="flex flex-col justify-start items-center">
      {userName} {userChatHistory}
    </div>
  );
}
