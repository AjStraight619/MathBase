import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import NewChatForm from "../chat-interface/new-chat-form";
import NewNoteForm from "../note-interface/new-note-form";

type SidebarDashboardProps = {
  mostRecentChatId: string;
};

export default function SidebarDashboard({
  mostRecentChatId,
}: SidebarDashboardProps) {
  const pathname = usePathname();
  const routes = [
    {
      name: "Chat With Note Genius",
      path: `/chat/${mostRecentChatId}`,
    },
    {
      name: "View Your Notes",
      path: "/notes",
    },
  ];
  const isNotePath = pathname.includes("notes");
  const isChatPath = pathname.includes("chats");
  const isHistoryPath = pathname.includes("history");
  return (
    <div className="flex flex-col w-full space-y-2">
      {isChatPath && <NewChatForm />}
      {isNotePath && <NewNoteForm />}
      {routes.map((route) => (
        <Link
          className="flex flex-row justify-start items-center group hover:bg-muted rounded-md py-1 px-2 gap-4"
          href={route.path}
          key={route.name}
          scroll={false}
        >
          {route.name}
          <FaArrowRight className="inline ml-1 text-muted/40 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}
