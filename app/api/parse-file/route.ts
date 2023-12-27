import { addExtractedTextToDb } from "@/actions/chatActions";
import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { createWorker } from "tesseract.js";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const chatId = req.nextUrl.searchParams.get("chatId") as unknown as string;

  const fileEntries = formData.getAll("file");
  let extractedTexts: string[] = [];

  for (const file of fileEntries) {
    if (!(file instanceof File)) continue;

    let text;
    if (file.type.includes("image/")) {
      text = await parseImages(file);
    } else if (file.type === "application/pdf") {
      text = await parsePdf(file);
    } else {
      continue;
    }

    extractedTexts.push(text);
  }
  await addExtractedTextToDb(chatId, extractedTexts);
  return NextResponse.json({ success: true, extractedTexts });
}

async function parseImages(file: File) {
  const worker = await createWorker("eng");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const {
    data: { text },
  } = await worker.recognize(buffer);
  await worker.terminate();
  return text;
}

async function parsePdf(file: File) {
  const pdfParser = new (PDFParser as any)(null, 1);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const parsedText = await new Promise<string>((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error(errData.parserError);
      reject(new Error("PDF parsing error"));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const textContent = (pdfParser as any).getRawTextContent();
      resolve(textContent);
    });

    pdfParser.parseBuffer(buffer);
  });

  return parsedText;
}
