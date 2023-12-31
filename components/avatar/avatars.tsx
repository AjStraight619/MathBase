"use client";
import { Avatar } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { WiStars } from "react-icons/wi";
import { AvatarFallback } from "../ui/avatar";

type AvatarProps = {
  className?: string;
  isLoading?: boolean;
};

export const UserAvatar = ({ className }: AvatarProps) => {
  const { data: session, status } = useSession();

  if (!session) return null;

  const user = session?.user as User;
  const userName = user?.name;

  return (
    <Avatar className={`${className}`}>
      <AvatarFallback className="font-semibold">
        {getInitials(userName ?? "")}
      </AvatarFallback>
    </Avatar>
  );
};

export const AssistantAvatar = ({ isLoading }: AvatarProps) => {
  const pulseVariants = {
    pulsate: {
      scale: [1, 1.2, 1.2, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  const starsVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.5, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        loop: Infinity,
      },
    },
  };

  return (
    <Avatar className="bg-slate-950 dark:bg-slate-500">
      <motion.div variants={pulseVariants} animate={isLoading ? "pulsate" : ""}>
        <AvatarFallback>
          <motion.div
            variants={starsVariants}
            animate={isLoading ? "animate" : ""}
          >
            <WiStars className="w-12 h-12 text-cyan-400" />
          </motion.div>
        </AvatarFallback>
      </motion.div>
    </Avatar>
  );
};

function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
}
