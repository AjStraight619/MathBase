import { Chat, ChatMessage } from "@prisma/client";
import { Item } from "./types";

export function isChat(item: Item): item is Chat & { messages: ChatMessage[] } {
  return "messages" in item;
}
