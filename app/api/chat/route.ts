import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type Message = {
  role: string;
  content: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

/**
 * Processes POST requests to generate chat completions using OpenAI.
 * Expects a request with chat messages and returns a streaming text response.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {StreamingTextResponse | NextResponse} - A streaming text response or an error response.
 */

export async function POST(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId") as unknown as string;
  try {
    const { messages } = await req.json();

    const lastUserMessage = messages.slice(-1)[0];

    if (lastUserMessage && lastUserMessage.role === "user") {
      const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        stream: true,
        messages,
      });

      const stream = OpenAIStream(response, {
        onCompletion: async (completion: string) => {
          const conversationUpdate: Message[] = [
            lastUserMessage,
            { role: "assistant", content: completion },
          ];
          await updateMessages(conversationUpdate, chatId);
        },
      });

      return new StreamingTextResponse(stream);
    } else {
      throw new Error(
        "No user message found or the last message is not from the user."
      );
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

/**
 * Updates the chat with new messages in the conversation.
 *
 * @param {Message[]} conversationUpdate - An array of messages to be added to the chat.
 * @param {string} chatId - The unique identifier of the chat.
 */

const updateMessages = async (
  conversationUpdate: Message[],
  chatId: string
) => {
  try {
    const res = await fetch("http://localhost:3000/api/users-chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
        conversationUpdate: conversationUpdate,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("successful update to db ", data);
    }
  } catch (error) {
    console.log(error);
  }
};