import { useItemId } from "@/hooks/useItemId";
import { ListMetaData } from "@/lib/types";
import Link from "next/link";
import ItemOptions from "./item-options";
import NewChatForm from "./new-chat-form";

type SidebarChatProps = {
  chatMetaData: ListMetaData[];
};

export default function SidebarChat({ chatMetaData }: SidebarChatProps) {
  const chatId = useItemId();

  return (
    <>
      <NewChatForm />
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
  );
}
