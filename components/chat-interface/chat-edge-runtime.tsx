import { ChatWithMessages } from "@/lib/types";
import Chat from "./Chat";

export const runtime = "edge";

export default function ChatEdgeRuntime({
  chatById,
}: {
  chatById: ChatWithMessages;
}) {
  return (
    <div className="flex flex-col items-center min-h-screen ml-[10rem]">
      <div className="container max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4">
        <Chat chatById={chatById} />
      </div>
    </div>
  );
}
