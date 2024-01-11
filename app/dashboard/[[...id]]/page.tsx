import { getAllChats } from "@/actions/chatActions";
import { getAllNotes } from "@/actions/noteActions";
import Dashboard from "@/components/dashboard-interface/Dashboard";
import { getUserSession } from "@/lib/session";
import { Chat, ChatMessage, Note } from "@prisma/client";

type DashboardProps = {
  searchParams: {
    search?: string;
  };
};

export const dynamic = "force-dynamic";

const getUserHistory = async () => {
  const user = await getUserSession();
  const userChatHistory = await prisma.chat.count({
    where: {
      userId: user.id,
    },
  });
  return userChatHistory;
};

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const chats = (await getAllChats()) as (Chat & { messages: ChatMessage[] })[];
  const notes = (await getAllNotes()) as Note[];
  const userChatHistory = await getUserHistory();

  const searchTerm = searchParams.search || "";

  const filterNotes = (items: Note[], term: string) => {
    if (!term) return items;
    const searchTermStr = term.toLowerCase();
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTermStr)
    );
  };

  const filterChats = (
    items: (Chat & { messages: ChatMessage[] })[],
    term: string
  ) => {
    if (!term) return items;
    const searchTermStr = term.toLowerCase();
    return items.filter(
      (chat) =>
        chat.title.toLowerCase().includes(searchTermStr) ||
        chat.messages.some((message) =>
          message.content.toLowerCase().includes(searchTermStr)
        )
    );
  };

  const filteredNotes = filterNotes(notes, searchTerm);
  const filteredChats = filterChats(chats, searchTerm);

  return (
    <div className="flex h-screen">
      <Dashboard
        notes={filteredNotes}
        chats={filteredChats}
        userChatHistory={userChatHistory}
      />
    </div>
  );
}
