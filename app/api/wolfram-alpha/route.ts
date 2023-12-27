import { ExtractedWolframData, QueryResult } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const WOLFRAMALPHAAPIURL = "https://api.wolframalpha.com/v2/query?input=";

/**
 * Handles GET requests to query Wolfram Alpha with provided equations.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - A JSON response containing the query result.
 */

export async function GET(req: NextRequest) {
  try {
    const equations = req.nextUrl.searchParams.getAll("equation");

    if (equations.length > 0) {
      const queryURL = `${WOLFRAMALPHAAPIURL}${encodeURIComponent(
        equations[0]
      )}&appid=${process.env.WolframAlpha_APP_ID}&output=json`;

      const res = await fetch(queryURL);
      if (res.ok) {
        const data = await res.json();
        const extractedData = extractRelevantData(data.queryresult);
        const mathResponse = await findMathResponseInDatabase(
          extractedData.input
        );
        if (mathResponse) {
          return NextResponse.json(mathResponse);
        } else {
          await storeMathResponseInDatabase(extractedData);
          return NextResponse.json(extractedData);
        }
      }
      const data = await res.json();

      return NextResponse.json(data);
    } else {
      throw new Error("Equation parameter is missing");
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error || "An error occurred" });
  }
}

async function findMathResponseInDatabase(inputEquation: string) {
  const mathResponse = await prisma.mathResponse.finUnique({
    where: { input: inputEquation },
  });

  if (mathResponse) {
    return mathResponse;
  } else {
    return null;
  }
}

async function storeMathResponseInDatabase(
  extractedData: ExtractedWolframData
) {
  const mathResponse = await prisma.mathResponse.create({
    data: {
      input: extractedData.input,
      solution: extractedData.solution,
      intermediateSteps: extractedData.intermediateSteps,
      plotImageURL: extractedData.plotImageURL,
      numberLineURL: extractedData.numberLineURL,
    },
  });
  console.log("Created math response with id: ", mathResponse.id);
}

function extractRelevantData(queryResult: QueryResult): ExtractedWolframData {
  const relevantData: ExtractedWolframData = {
    input: queryResult.inputstring,
    solution: "",
    intermediateSteps: "",
    plotImageURL: "",
    numberLineURL: "",
  };

  queryResult.pods.forEach((pod) => {
    switch (pod.title) {
      case "Solution":
        relevantData.solution = pod.subpods[0]?.plaintext;
        break;
      case "Result":
        relevantData.intermediateSteps = pod.subpods[0]?.plaintext;
        break;
      case "Plot":
        relevantData.plotImageURL = pod.subpods[0]?.img.src;
        break;
      case "Number line":
        relevantData.numberLineURL = pod.subpods[0]?.img.src;
        break;
    }
  });

  return relevantData;
}
