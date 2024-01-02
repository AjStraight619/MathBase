"use server";
import * as math from "mathjs";

export async function evaluateMathExpression(expression: string) {
  try {
    const result = math.evaluate(expression);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
