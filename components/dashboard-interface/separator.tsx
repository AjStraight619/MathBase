"use client";
import { Separator } from "@/components/ui/separator";
import { useSidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/navigation";

type DashboardSeparatorProps = {
  currentListType: "notes" | "chats";
};

export function DashboardSeparator({
  currentListType,
}: DashboardSeparatorProps) {
  const router = useRouter();
  const { isSidebarOpen } = useSidebarContext();
  const handleChangeItemRoute = (listType: "notes" | "chats") => {
    router.push(`/dashboard/${listType}`);
  };

  return (
    <div className={`mt-4 ${!isSidebarOpen ? "ml-[2rem]" : ""}`}>
      <div className="space-y-1">
        <h4 className="text-lg font-semibold leading-none pb-2">Dashboard</h4>
        <p className="text-xs text-muted-foreground">
          Your personalized hub for tracking progress, accessing resources, and
          managing your AI-driven math learning journey.
        </p>
      </div>
      <Separator className="my-4" />

      <div
        className={`fixed top-4 ${
          isSidebarOpen ? "left-[calc(50%+100px)]" : "left-1/2"
        } transform -translate-x-1/2 flex h-5 items-center justify-center space-x-4 text-sm z-50`}
      >
        <div className="flex items-center space-x-4 backdrop-blur-sm px-4 py-2 rounded-md bg-white/30">
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
    </div>
  );
}
