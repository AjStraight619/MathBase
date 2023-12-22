"use client";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./button";

type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function SubmitButton({
  children,
  onClick,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        className={cn(className)}
        onClick={onClick}
        type="submit"
        disabled={pending}
      >
        {pending ? <CgSpinner className="animate-spin" /> : children}
      </Button>
    </div>
  );
}
