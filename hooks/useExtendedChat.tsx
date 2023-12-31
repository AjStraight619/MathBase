import { ChatWithMessages, ExtendedMessage } from "@/lib/types";
import { UseChatOptions, useChat } from "ai/react";
import { useMemo } from "react";

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
        addedToNote: msg.addedToNote ?? false,
        mathResponse: msg.mathResponse ?? null,
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
        addedToNote: false,
        mathResponse: null,
      })
    );

    return [...dbMessages, ...transformedLiveMessages];
  }, [liveMessages, chatById]);

  return { messages: allMessages, ...rest };
};
