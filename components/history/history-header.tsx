"use client";
import { useUser } from "@/hooks/useUser";
import { motion } from "framer-motion";

const userVariants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
  },
  transition: { type: "spring", duration: 0.5, ease: "easeIn" },
};

export default function HistoryHeader() {
  const { user, isUserLoading, error } = useUser();
  const username = user?.name;

  return (
    <>
      {isUserLoading && <div>Loading....</div>}
      <motion.h1
        variants={userVariants}
        animate="show"
        initial="hidden"
        className="text-2xl text-center font-semibold"
      >
        Welcome back {username}!
      </motion.h1>
    </>
  );
}
