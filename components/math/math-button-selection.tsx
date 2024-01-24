"use client";
import { buttonCategories } from "@/lib/data";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import DropdownButton from "../ui/dropdown-button";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function MathSubject({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={`${className}`}>
        <DropdownButton isOpen={isOpen} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col ">
        <motion.ul
          className="space-y-2 w-full"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Object.keys(buttonCategories).map((category) => (
            <motion.li variants={item} key={category}>
              <Button className="w-full">{category}</Button>
            </motion.li>
          ))}
        </motion.ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
