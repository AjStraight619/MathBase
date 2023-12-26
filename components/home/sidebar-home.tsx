"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarHome({
  mostRecentChatId,
}: {
  mostRecentChatId: string;
}) {
  const routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: `/chat/${mostRecentChatId}`,
      name: "Chat",
    },
  ] as const;

  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-2 w-full rounded-md">
      {routes.map((route) => (
        <Link key={route.name} href={route.path}>
          <div
            className={`w-full p-2 rounded-md ${
              pathname === route.name ? "bg-muted/80 " : "hover:bg-muted/40"
            }`}
          >
            {route.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
