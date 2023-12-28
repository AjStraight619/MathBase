import { useItemId } from "@/hooks/useItemId";
import { AllFolders, Folder, ListMetaData, Note } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import FolderDropdown from "../note-interface/folder-dropdown";
import NewNoteForm from "../note-interface/new-note-form";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ItemOptions from "./item-options";
import NewChatForm from "./new-chat-form";

type SidebarChatProps = {
  chatMetaData: ListMetaData[];
  allFolders: AllFolders[];
};

type ViewType = "Chats" | "Folders";

/**
 * Component for displaying chat items in the sidebar.
 * @param {Object} props - Component props.
 * @param {ListMetaData[]} props.chatMetaData - Metadata for the chat items.
 */

export default function SidebarChat({
  chatMetaData,
  allFolders,
}: SidebarChatProps) {
  const chatId = useItemId();
  const [listView, setListView] = useState<"Chats" | "Folders">("Chats");
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    if (allFolders && allFolders.length > 0) {
      setSelectedFolder(allFolders[0]);
    }
  }, [allFolders]);

  const handleListViewChange = (newView: "Chats" | "Folders") => {
    if (listView === newView) {
      return;
    }

    setListView(newView);
  };
  const listViewOptions: { name: string; view: ViewType; icon: JSX.Element }[] =
    [
      {
        name: "Chat",
        view: "Chats",
        icon: <IoChatbox className="w-8 h-8 hover:scale-105" />,
      },
      {
        name: "Folder",
        view: "Folders",
        icon: <FaFolder className="w-8 h-8 text-opacity-90 hover:scale-105" />,
      },
    ];

  return (
    <>
      <div className="flex flex-row justify-evenly mb-4">
        {listViewOptions.map((option) => {
          return (
            <button
              key={option.name}
              onClick={() => handleListViewChange(option.view)}
              className={`flex items-center justify-center space-x-2 py-1 px-2 rounded-full ${
                listView === option.view ? "bg-muted/20" : "hover:bg-muted/40 "
              }`}
            >
              {option.icon}
            </button>
          );
        })}
      </div>
      <ScrollArea>
        {listView === "Chats" ? (
          <>
            <NewChatForm />
            <h3 className="text-muted-foreground text-md">Chats</h3>

            <Separator className="w-full text-muted-foreground mt-1 mb-3" />
            {chatMetaData.map((chat) => {
              const isCurrentChat = chatId === chat.id;

              return (
                <div
                  className={`flex items-center justify-between space-x-2 py-1 px-2 rounded-md ${
                    isCurrentChat ? "bg-muted/80" : "hover:bg-muted/40"
                  }`}
                  key={chat.id}
                >
                  <Link
                    href={`/chat/${chat.id}`}
                    className="flex-grow whitespace-nowrap text-clip overflow-hidden text-sm"
                  >
                    {chat.title}
                  </Link>
                  {isCurrentChat && <ItemOptions chatMetaData={chatMetaData} />}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <NewNoteForm className="w-calc[(100% - 1rem)]" />

            <div className="w-full flex flex-col justify-center items-start">
              <FolderDropdown
                allFolders={allFolders}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
              />
              {selectedFolder &&
                selectedFolder.notes.map((note) => {
                  const isCurrentNote = selectedNote?.id === note.id;
                  return (
                    <div
                      className={`flex items-center justify-between space-x-2 py-1 px-2 rounded-md ${
                        isCurrentNote ? "bg-muted/80" : "hover:bg-muted/40"
                      }`}
                      key={note.id}
                    >
                      <Link
                        href={`/note/${selectedNote?.id}`}
                        className="flex-grow whitespace-nowrap text-clip overflow-hidden text-sm"
                      >
                        {note.title}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </ScrollArea>
    </>
  );
}
