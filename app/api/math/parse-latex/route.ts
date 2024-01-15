import { latexParser } from "latex-parser";
import * as math from "mathjs";
import { NextRequest, NextResponse } from "next/server";

type CharacterCategeory = {
  string: string;
  category: number;
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const equation = formData.get("equation");
  console.log("Equation:", equation);

  const tokens = latexParser.parse(equation as string);
  tokens.value?.forEach((token: any) => {
    const charCategories: CharacterCategeory[] = token.characterCategories;
    console.log("Character Categories:", charCategories);
    const equation = charCategories
      .map((char) => char.string)
      .join("")
      .toString();
    console.log("Equation:", equation);
    const result = math.evaluate(equation);
    console.log("Result:", result);
  });

  const tokenJsonString = JSON.stringify(tokens, null, 2);
  console.log("Tokens:", tokens);
  console.log("Token JSON:", tokenJsonString);

  return NextResponse.json({ equation: equation });
}

const reconstructEquation = (array: any[]): string => {
  let equation = "";
  array.forEach((char) => {
    if (char.arguments) {
      equation += reconstructEquation(char.arguments);
    } else {
      equation += char.string;
    }
  });
  return equation;
};
