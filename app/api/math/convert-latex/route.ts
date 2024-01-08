import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const latexEquation = formData.get("equation") as unknown as string;
  console.log("Equation:", latexEquation);

  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          "You will receive a LaTeX equation as input. Please convert this equation into a descriptive, plain text question suitable for querying Wolfram Alpha. Ensure the question is specific, uses standard mathematical language, defines all variables and functions, and sets clear boundaries or ranges if applicable. Example: Convert 'integrate x^2 dx from 0 to 2' into 'Calculate the integral of x squared from 0 to 2'.",
      },
      {
        role: "user",
        content: latexEquation,
      },
    ],
  });

  console.log("This is the response:", response.choices[0]);

  return NextResponse.json({ response: response.choices[0] });
}
