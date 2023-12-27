import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "edge";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return NextResponse.json({ success: true });
}
