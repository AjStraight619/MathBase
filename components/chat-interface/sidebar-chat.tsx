import { ListMetaData } from "@/lib/types";
import Link from "next/link";
import NewChatForm from "./new-chat-form";

type SidebarChatProps = {
  chatMetaData: ListMetaData[];
  pathname: string;
};

export default function SidebarChat({
  chatMetaData,
  pathname,
}: SidebarChatProps) {
  const chatId = pathname.split("/")[2];

  // TODO: Add text fading animation to chat title

  return (
    <>
      <NewChatForm />
      {chatMetaData.map((chat) => {
        return (
          <div className="flex flex-col space-y-2" key={chat.id}>
            <Link
              href={`/chat/${chat.id}`}
              className={`w-full py-1 px-2 rounded-md hover:cursor-pointer whitespace-nowrap text-clip overflow-hidden ${
                chatId === chat.id ? "bg-muted/80 " : "hover:bg-muted/40"
              }`}
            >
              <div className="">{chat.title}</div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
