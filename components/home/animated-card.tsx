"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

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

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial="closed"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="my-4"
    >
      <Link
        href={href}
        className="block  border border-transparent transition-colors"
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={`space-y-3 p-5 border ${
            isHovered
              ? "border-muted-foreground rounded-md  bg-gradient-to-r from-gray-200/40 from-0% to-dark:secondary/20 to-80%"
              : "border-transparent"
          }`}
        >
          <h2 className="text-2xl font-semibold flex items-center justify-evenly">
            {title}
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="inline-block"
            >
              →
            </motion.span>
          </h2>
          <p className="max-w-[30ch] text-sm text-muted-foreground">
            {description}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
