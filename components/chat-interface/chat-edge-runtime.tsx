import { ChatWithMessages } from "@/lib/types";
import Chat from "./Chat";

export const runtime = "edge";

type ChatEdgeRuntimeProps = {
  chatById: ChatWithMessages;
};

export default async function ChatEdgeRuntime({
  chatById,
}: ChatEdgeRuntimeProps) {
  return <Chat chatById={chatById} />;
}
