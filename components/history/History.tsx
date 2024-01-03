"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function History() {
  const { data: session } = useSession();
  const user = session?.user as User;
  const userName = user?.name;
  const { isSidebarOpen } = useSidebarContext();

  return <div>{userName}</div>;
}
