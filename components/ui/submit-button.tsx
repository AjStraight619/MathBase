"use client";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./button";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export default function SubmitButton({
  children,
  className,
  disabled,
  variant,
  size,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(className)}
      type="submit"
      disabled={pending || disabled}
      variant={variant}
      size={size}
    >
      {pending ? <CgSpinner className="animate-spin" /> : children}
    </Button>
  );
}
