import { getChatById } from "@/actions/chatActions";
import ChatEdgeRuntime from "@/components/chat-interface/chat-edge-runtime";
import { ChatWithMessages } from "@/lib/types";

type ChatPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    search?: string;
  };
};
export default async function ChatPage({
  params,
  searchParams,
}: ChatPageProps) {
  const { id } = params;
  const searchTerm = searchParams.search || "";
  const chatById = (await getChatById(id)) as unknown as ChatWithMessages;
  return <ChatEdgeRuntime chatById={chatById} searchTerm={searchTerm} />;
}
