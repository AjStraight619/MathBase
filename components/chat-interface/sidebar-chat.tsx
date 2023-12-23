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
  return (
    <>
      <NewChatForm />
      {chatMetaData.map((item) => (
        <div key={item.id}>
          <Link
            href={`/chat/${item.id}`}
            className={`flex items-center space-x-2 py-1 px-4 rounded-md ${
              pathname === `/chat/${item.id}`
                ? "bg-muted/80 "
                : "hover:bg-muted/40"
            }`}
          >
            <span className="text-md">{item.title}</span>
          </Link>
        </div>
      ))}
    </>
  );
}
