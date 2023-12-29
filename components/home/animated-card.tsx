// AnimatedCard.tsx
"use client";

import { useSidebarContext } from "@/context/SidebarContext";
import { containerVariants } from "@/lib/animationVariants";
import { motion } from "framer-motion";
import Link from "next/link";

type AnimatedCardProps = {
  href: string;
  title: string;
  description: string;
};

export default function AnimatedCard({
  href,
  title,
  description,
}: AnimatedCardProps) {
  const { isSidebarOpen } = useSidebarContext();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="closed"
      animate={isSidebarOpen ? "open" : "closed"}
      className="w-full"
    >
      <Link
        href={href}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <h2 className="text-2xl font-semibold">
            {title}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="max-w-[30ch] text-sm text-muted-foreground">
            {description}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
