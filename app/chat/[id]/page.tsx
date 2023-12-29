import { getChatById } from "@/actions/chatActions";
import ChatEdgeRuntime from "@/components/chat-interface/chat-edge-runtime";
import { ChatWithMessages } from "@/lib/types";

type ChatPageProps = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = params;
  const chatById = (await getChatById(id)) as unknown as ChatWithMessages;
  return <ChatEdgeRuntime chatById={chatById} />;
}
