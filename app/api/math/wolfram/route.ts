import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const formData = await req.formData();
  const equation = formData.get("equation");
  console.log(equation);
}
