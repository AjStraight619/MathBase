import { getAllChats } from "@/actions/chatActions";
import { getAllNotes } from "@/actions/noteActions";
import Dashboard from "@/components/dashboard-interface/Dashboard";
import SearchBar from "@/components/dashboard-interface/searchbar";

type DashboardProps = {
  params: { id: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardProps) {
  const chats = await getAllChats();
  const notes = await getAllNotes();
  const searchTerm = searchParams.search;

  return (
    <div className="flex h-screen ml-[12rem]">
      <SearchBar />
      <Dashboard notes={notes} chats={chats} searchTerm={searchTerm} />
    </div>
  );
}
