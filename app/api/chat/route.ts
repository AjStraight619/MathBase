import { getErrorMessage } from "@/lib/utils";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://math-base.vercel.app"
    : "http://localhost:3000";

type Message = {
  role: string;
  content: string;
};

type MathDataToSendToGPT = {
  prompt: string;
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
    const { messages: userMessages, prompt, mathResponse } = await req.json();
    JSON.stringify(mathResponse);

    const mathDataToSendToGPT = {
      prompt: prompt,
      mathResponse: mathResponse,
    };

    const lastUserMessage = userMessages.slice(-1)[0];

    if (lastUserMessage && lastUserMessage.role === "user") {
      const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        stream: true,
        messages: [
          {
            role: "system",
            content: `The assistant Note Genius, based on GPT-4 technology, is designed to provide helpful and precise answers in mathematics. For all mathematical responses, please format equations and expressions using LaTeX syntax. Ensure that the LaTeX is suitable for rendering in Markdown with rehype-katex and remark-math plugins. Examples include inline equations like $E = mc^2$ and display equations like $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$. 
              ${prompt ? prompt : ""}`,
          },
          ...userMessages,
        ],
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
      console.log("OpenAI API error: ", error);
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
    const res = await fetch(`${baseUrl}/api/users-chats`, {
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
    const err = getErrorMessage(error);
    console.error("Error updating messages: ", err);
  }
};
