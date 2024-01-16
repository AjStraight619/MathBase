import katex from "katex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { latexEquation } = await req.json();
  console.log("latex equation:", latexEquation);

  const renderedLatex = katex.renderToString(latexEquation, {
    throwOnError: false,
  });

  return NextResponse.json({ renderedLatex });
}
