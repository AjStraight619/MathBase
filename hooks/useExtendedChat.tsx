import { ChatWithMessages } from "@/lib/types"; // Ensure this import is correct
import { Message as AIMessage } from "ai";
import { useChat, UseChatOptions } from "ai/react";
import { useMemo } from "react";

export interface ExtendedMessage extends AIMessage {
  isExtractedEquation: boolean;
  extractedText: string | null;
  chatId: string;
}

type UseExtendedChatProps = {
  options: UseChatOptions;
  chatById: ChatWithMessages | null;
};

export const useExtendedChat = ({
  options,
  chatById,
}: UseExtendedChatProps) => {
  const { messages: liveMessages, ...rest } = useChat(options);

  const allMessages = useMemo(() => {
    const dbMessages: ExtendedMessage[] =
      chatById?.messages.map((msg) => ({
        ...msg,
        isExtractedEquation: msg.isExtractedEquation ?? false,
        extractedText: msg.extractedText ?? null,
        chatId: chatById.id,
      })) || [];

    const newLiveMessages = liveMessages.filter(
      (liveMsg) => !dbMessages.some((dbMsg) => dbMsg.id === liveMsg.id)
    );

    const transformedLiveMessages: ExtendedMessage[] = newLiveMessages.map(
      (liveMsg) => ({
        ...liveMsg,
        isExtractedEquation: false,
        extractedText: null,
        chatId: chatById?.id || "",
      })
    );

    return [...dbMessages, ...transformedLiveMessages];
  }, [liveMessages, chatById]);

  return { messages: allMessages, ...rest };
};
