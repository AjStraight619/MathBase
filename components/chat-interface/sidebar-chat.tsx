import { useItemId } from "@/hooks/useItemId";
import { AllFolders, Folder, ListMetaData, Note } from "@/lib/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import FolderDropdown from "../note-interface/folder-dropdown";
import NewNoteForm from "../note-interface/new-note-form";
import NotePreview from "../note-interface/note-preview";
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
 * SidebarChat displays chat items and folder options in the sidebar.
 * It allows switching between chats and folders view.
 *
 * @param {Object} props - Component props.
 * @param {ListMetaData[]} props.chatMetaData - Metadata for the chat items.
 * @param {AllFolders[]} props.allFolders - Information about all available folders.
 */

export default function SidebarChat({
  chatMetaData,
  allFolders,
}: SidebarChatProps) {
  const chatId = useItemId();
  const [listView, setListView] = useState<"Chats" | "Folders">("Chats");
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const selectedNoteId = searchParams.get("selectedNote");
  if (!selectedNoteId) {
    const noteId = selectedFolder?.notes[0]?.id;
    if (noteId) {
      push(`/chat/${chatId}/selectedNote?selectedNote=${noteId}`);
    }
  }

  useEffect(() => {
    if (allFolders && allFolders.length > 0) {
      setSelectedFolder(allFolders[0]);
    }
  }, [allFolders]);

  useEffect(() => {
    if (selectedFolder?.notes.length === 0) {
      if (!selectedNoteId && selectedFolder?.notes.length > 0) {
        const defaultNoteId = selectedFolder.notes[0].id;
        push(`/chat/${chatId}/selectedNote?selectedNote=${defaultNoteId}`);
      }
    }
  }, [selectedNoteId, selectedFolder, chatId, push]);

  useEffect(() => {
    const updateSelectedNote = () => {
      const selectedNote = filterForSelectedNote(allFolders, selectedNoteId);
      if (!selectedNote) {
        return;
      }
      setSelectedNote(selectedNote);
    };

    if (selectedNoteId) {
      updateSelectedNote();
    }
  }, [selectedNoteId, allFolders]);

  const handleListViewChange = (newView: "Chats" | "Folders") => {
    if (listView === newView) {
      return;
    }
    setListView(newView);
  };

  const handleNoteClick = (noteId: string) => {
    push(`/chat/${chatId}/selectedNote?selectedNote=${noteId}`);
  };

  return (
    <>
      <div className="flex flex-row justify-evenly mb-4">
        {listViewOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => handleListViewChange(option.view)}
            className={`flex items-center justify-center space-x-2 py-1 px-2 rounded-full ${
              listView === option.view ? "bg-muted/20" : "hover:bg-muted/40"
            }`}
          >
            {option.icon}
          </button>
        ))}
      </div>
      <ScrollArea>
        {listView === "Chats" ? (
          <>
            <NewChatForm />
            <h3 className="text-muted-foreground text-md">Chats</h3>
            <Separator className="w-full text-muted-foreground mt-1 mb-3" />
            <ul>
              {chatMetaData.map((chat) => {
                const isCurrentChat = chatId === chat.id;

                return (
                  <li
                    className={`flex items-center justify-between space-x-2 py-1 px-2 rounded-md ${
                      isCurrentChat ? "bg-muted/80" : "hover:bg-muted/40"
                    }`}
                    key={chat.id}
                  >
                    <Link
                      href={`/chat/${chat.id}`}
                      className="flex-grow whitespace-nowrap text-clip truncate text-sm"
                    >
                      {chat.title}
                    </Link>
                    {isCurrentChat && (
                      <ItemOptions chatMetaData={chatMetaData} />
                    )}
                  </li>
                );
              })}
            </ul>
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
              {selectedFolder && (
                <ul className="w-full flex-row justify-between">
                  {selectedFolder.notes.map((note) => {
                    const isSelectedNote = note.id === selectedNoteId;
                    return (
                      <li
                        className={`flex items-center justify-between space-x-2 py-1 px-2 rounded-md hover:cursor-pointer ${
                          isSelectedNote ? "bg-muted/80" : "hover:bg-muted/40"
                        }`}
                        key={note.id}
                      >
                        <div
                          onClick={() => handleNoteClick(note.id)}
                          className="flex-grow whitespace-nowrap overflow-hidden text-clip text-sm"
                        >
                          {note.title}
                        </div>
                        {/* Render NotePreview only if this note is the selected note */}
                        {isSelectedNote && <NotePreview />}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </ScrollArea>
    </>
  );
}

const listViewOptions: { name: string; view: ViewType; icon: JSX.Element }[] = [
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

const filterForSelectedNote = (
  allFolders: AllFolders[],
  selectedNoteId: string | null
) => {
  if (!selectedNoteId) {
    return null;
  }
  const selectedNote = allFolders
    .map((folder) => folder.notes)
    .flat()
    .find((note) => note.id === selectedNoteId);
  return selectedNote;
};
