"use client";
import { buttonCategories } from "@/lib/data";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";
import DropdownButton from "../ui/dropdown-button";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function MathSubject() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DropdownButton isOpen={isOpen} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(buttonCategories).map((category) => (
          <Button key={category}>{category}</Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
