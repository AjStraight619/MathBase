"use client";
import { Separator } from "@/components/ui/separator";

import { Dispatch, SetStateAction } from "react";

type DashboardSeparatorProps = {
  setCurrentListType: Dispatch<SetStateAction<"notes" | "chats">>;
  currentListType: "notes" | "chats";
};

export function DashboardSeparator({
  setCurrentListType,
  currentListType,
}: DashboardSeparatorProps) {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Dashboard</h4>
        <p className="text-sm text-muted-foreground">
          Your personalized hub for tracking progress, accessing resources, and
          managing your AI-driven math learning journey.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <button
          className={`${
            currentListType === "chats" ? "" : "text-muted-foreground"
          }`}
          onClick={() => setCurrentListType("chats")}
        >
          Chats
        </button>
        <Separator orientation="vertical" />
        <button
          className={`${
            currentListType === "notes" ? "" : "text-muted-foreground"
          }`}
          onClick={() => setCurrentListType("notes")}
        >
          Notes
        </button>
        <Separator orientation="vertical" />
        <div className="text-muted-foreground">History</div>
      </div>
    </div>
  );
}
