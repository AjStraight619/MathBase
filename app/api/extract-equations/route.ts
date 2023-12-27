import { NextRequest } from "next/server";
import OpenAI from "openai";
export const runtime = "edge";

export default function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}
