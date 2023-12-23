import { getAllChats } from "@/actions/chatActions";
import { getAllNotes } from "@/actions/noteActions";
import Dashboard from "@/components/dashboard-interface/Dashboard";
import { Chat, ChatMessage, Note } from "@prisma/client";

type DashboardProps = {
  params: { id: string };
  searchParams: {
    search?: string;
  };
};

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardProps) {
  const chats = (await getAllChats()) as (Chat & { messages: ChatMessage[] })[];
  const notes = (await getAllNotes()) as Note[];
  const searchTerm = searchParams.search || "";
  const { id } = params;

  console.log(id);

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
    <div className="flex h-screen ml-[12rem]">
      <Dashboard notes={filteredNotes} chats={filteredChats} />
    </div>
  );
}
