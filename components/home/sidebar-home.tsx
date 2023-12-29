"use client";
import { routes as originalRoutes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarHome({
  mostRecentChatId,
}: {
  mostRecentChatId: string;
}) {
  const pathname = usePathname();

  const appendMostRecentChatId = () => {
    return originalRoutes.map((route) => {
      if (route.name === "Chat") {
        return { ...route, path: `/chat/${mostRecentChatId}` };
      }
      return route;
    });
  };

  const routes = appendMostRecentChatId();

  return (
    <div className="flex flex-col space-y-2 w-full rounded-md">
      {routes.map((route) => (
        <Link key={route.name} href={route.path}>
          <div
            className={`w-full p-2 rounded-md ${
              pathname === route.path ? "bg-muted/80 " : "hover:bg-muted/40"
            }`}
          >
            {route.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
