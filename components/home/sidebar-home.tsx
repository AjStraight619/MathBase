import Link from "next/link";

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

  return (
    <div className="flex flex-col items-start space-y-2">
      {routes.map((route) => (
        <Link className="" key={route.name} href={route.path}>
          {route.name}
        </Link>
      ))}
    </div>
  );
}
