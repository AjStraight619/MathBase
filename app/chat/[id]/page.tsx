import { getChatById } from "@/actions/chatActions";
import ChatEdgeRuntime from "@/components/chat-interface/chat-edge-runtime";

type ChatPageProps = {
  params: {
    id: string;
  };
};
export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = params;
  const chatById = await getChatById(id);
  return <ChatEdgeRuntime chatById={chatById} />;
}
