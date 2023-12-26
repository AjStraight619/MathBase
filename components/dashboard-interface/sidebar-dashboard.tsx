import Link from "next/link";
import NewChatForm from "../chat-interface/new-chat-form";
import NewNoteForm from "../note-interface/new-note-form";

type SidebarDashboardProps = {
  mostRecentChatId: string;
  pathname: string;
};

export default function SidebarDashboard({
  mostRecentChatId,
  pathname,
}: SidebarDashboardProps) {
  const routes = [
    {
      name: "Chats",
      path: `/chat/${mostRecentChatId}`,
    },
  ];
  const isNotePath = pathname.includes("notes");
  const isChatPath = pathname.includes("chats");
  return (
    <div className="flex flex-col w-full space-y-2">
      {isChatPath && <NewChatForm />}
      {isNotePath && <NewNoteForm />}
      {routes.map((route) => (
        <Link
          className="hover:bg-muted rounded-md py-1 px-2"
          href={route.path}
          key={route.name}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
}
