"use client";
import { Avatar } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { AvatarFallback } from "../ui/avatar";

type AvatarProps = {
  className?: string;
};

export const UserAvatar = ({ className }: AvatarProps) => {
  const { data: session } = useSession();
  if (!session) return null;

  const user = session?.user as User;
  const userName = user?.name;

  return (
    <Avatar className={` ${className}`}>
      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
    </Avatar>
  );
};

export const AssistantAvatar = () => {
  return (
    <Avatar className="text-cyan-500">
      <AvatarFallback>NG</AvatarFallback>
    </Avatar>
  );
};

function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
}
