"use client";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

type DashboardSeparatorProps = {
  currentListType: "notes" | "chats";
};

export function DashboardSeparator({
  currentListType,
}: DashboardSeparatorProps) {
  const router = useRouter();

  const handleChangeItemRoute = (listType: "notes" | "chats") => {
    router.push(`/dashboard/${listType}`);
  };

  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-lg font-medium leading-none pb-2">Dashboard</h4>
        <p className="text-xs text-muted-foreground">
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
          onClick={() => handleChangeItemRoute("chats")}
        >
          Chats
        </button>
        <Separator orientation="vertical" />
        <button
          className={`${
            currentListType === "notes" ? "" : "text-muted-foreground"
          }`}
          onClick={() => handleChangeItemRoute("notes")}
        >
          Notes
        </button>
        <Separator orientation="vertical" />
        <div className="text-muted-foreground">History</div>
      </div>
    </div>
  );
}
