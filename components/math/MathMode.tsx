"use client";
import { useMathModeContext } from "@/context/MathModeProvider";
import { useCompletion } from "ai/react";

export default function MathMode() {
  const { mathMode } = useMathModeContext();
  const {} = useCompletion({
    api: "/api/extract-equations",
  });
}
