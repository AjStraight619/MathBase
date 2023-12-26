import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Chats",
    path: "/chat",
  },
];

type SidebarDashboardProps = {
  mostRecentChatId: string;
};

export default function SidebarDashboard({
  mostRecentChatId,
}: SidebarDashboardProps) {
  const pathname = usePathname();
  const isNotePath = pathname.includes("notes");
  const isChatPath = pathname.includes("chats");
  return (
    <div className="flex flex-col w-full space-y-2">
      {routes.map((route) => (
        <Link href={route.path} key={route.name} />
      ))}
    </div>
  );
}
