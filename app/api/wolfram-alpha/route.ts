import { prisma } from "@/lib/prisma";
import {
  ContentItem,
  MathResponseType,
  PodData,
  QueryResult,
} from "@/lib/types";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const WOLFRAMALPHAAPIURL = "https://api.wolframalpha.com/v2/query?input=";

/**
 * Handles GET requests to query Wolfram Alpha with provided equations.
 * Checks if a response already exists in the database; if not, it queries Wolfram Alpha.
 *
 * @param {NextRequest} req - The incoming request object containing query parameters.
 * @returns {NextResponse} - A JSON response containing the query result or stored math response.
 */
export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.get("queryString");
    const chatId = req.nextUrl.searchParams.get("chatId") as unknown as string;
    const path = req.nextUrl.searchParams.get("path");

    if (!queryString) {
      return NextResponse.json({ error: "No equation provided" });
    }

    const existingMathResponse = await findMathResponseInDatabase(queryString);
    if (existingMathResponse) {
      console.log(
        "Found existing math response in database:",
        existingMathResponse
      );
      if (path) {
        revalidatePath(path);
      }
      return NextResponse.json(existingMathResponse);
    }

    const queryURL = `${WOLFRAMALPHAAPIURL}${encodeURIComponent(
      queryString
    )}&appid=${process.env.WolframAlpha_APP_ID}&output=json`;

    const res = await fetch(queryURL);
    if (res.ok) {
      const data = await res.json();
      console.log("Wolfram Alpha API response:", JSON.stringify(data, null, 2));
      const extractedData = extractDataFromPods(data.queryresult);
      const storedMathResponse = await storeMathResponseInDatabase(
        chatId,
        extractedData
      );

      if (path) {
        revalidatePath(path);
      }

      return NextResponse.json(storedMathResponse);
    } else {
      throw new Error("Failed to fetch data from Wolfram Alpha");
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "An error occurred" });
  }
}

/**
 * Searches for an existing math response in the database based on the input equation.
 *
 * @param {string} inputEquation - The equation to search for in the database.
 * @returns {Promise<MathResponse | null>} - The found math response or null if not found.
 */

async function findMathResponseInDatabase(inputEquation: string) {
  const mathResponse = await prisma.mathResponse.findFirst({
    where: {
      input: inputEquation,
    },
  });

  return mathResponse;
}

/**
 * Stores extracted data from Wolfram Alpha into the database.
 *
 * @param {string} chatId - The ID of the chat associated with the math response.
 * @param {MathResponseType} extractedData - The extracted data to be stored.
 * @returns {Promise<MathResponse>} - The newly created math response.
 */

async function storeMathResponseInDatabase(
  chatId: string,
  extractedData: MathResponseType
) {
  const mathResponse = await prisma.mathResponse.create({
    data: {
      input: extractedData.inputString,
      podsData: extractedData.podsData,
      chats: {
        connect: { id: chatId },
      },
    },
  });

  console.log("Created math response with id: ", mathResponse.id);
  return mathResponse;
}

/**
 * Extracts data from the query result of Wolfram Alpha API.
 *
 * @param {QueryResult} queryResult - The result object from Wolfram Alpha query.
 * @returns {MathResponseType} - The structured data extracted from the query result.
 */

const extractDataFromPods = (queryResult: QueryResult) => {
  if (!queryResult.success) {
    throw new Error("Error in query result");
  }

  const extractedData: MathResponseType = {
    inputString: queryResult.inputstring,
    podsData: [],
    assumptions: queryResult.assumptions || null,
  };

  queryResult.pods.forEach((pod) => {
    const podData: PodData = {
      title: pod.title,
      content: [],
    };

    pod.subpods.forEach((subpod) => {
      const contentItem: ContentItem = {
        plaintext: subpod.plaintext,
        imageUrl: subpod.img?.src || "",
      };
      podData.content.push(contentItem);
    });

    extractedData.podsData.push(podData);
  });

  console.log("Extracted data:", extractedData);

  return extractedData;
};
