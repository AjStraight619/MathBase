"use client";
import { useEffect } from "react";
import { Button } from "./button";

type MathResponseBtnProps = {
  children: React.ReactNode;

  className?: string;
  isLoadingLaTeXToPlainText: boolean;
  isLoadingPlainTextToWolfram: boolean;
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

export default function MathSubmitBtn({
  children,
  className,
  isLoadingLaTeXToPlainText,
  isLoadingPlainTextToWolfram,
}: MathResponseBtnProps) {
  const isLoading = isLoadingLaTeXToPlainText || isLoadingPlainTextToWolfram;
  useEffect(() => {
    if (isLoadingLaTeXToPlainText) {
      console.log("MathSubmitBtn: isLoadingLaTeXToPlainText is true");
    }
    if (isLoadingPlainTextToWolfram) {
      console.log("MathSubmitBtn: isLoadingPlainTextToWolfram is true");
    }
  }, [isLoadingLaTeXToPlainText, isLoadingPlainTextToWolfram]);

  return (
    <Button type="submit" className={className} disabled={isLoading}>
      {isLoading ? "Loading..." : children}
    </Button>
  );
}
