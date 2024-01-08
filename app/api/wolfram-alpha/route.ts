import { Assumptions, ContentItem, PodData, QueryResult } from "@/lib/types";
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
    const queryString = req.nextUrl.searchParams.get("queryString");

    if (!queryString) {
      return NextResponse.json({ error: "No equation provided" });
    }

    // First, check if the response already exists in the database
    // const existingMathResponse = await findMathResponseInDatabase(queryString);
    // if (existingMathResponse) {
    //   console.log(
    //     "Found existing math response in database:",
    //     existingMathResponse
    //   );
    //   return NextResponse.json(existingMathResponse);
    // }

    const queryURL = `${WOLFRAMALPHAAPIURL}${encodeURIComponent(
      queryString
    )}&appid=${process.env.WolframAlpha_APP_ID}&output=json`;

    const res = await fetch(queryURL);
    if (res.ok) {
      const data = await res.json();
      console.log("Wolfram Alpha API response:", data);
      const extractedData = extractDataFromPods(data.queryresult);
      console.log("Extracted data:", extractedData);

      // await storeMathResponseInDatabase(extractedData);
      return NextResponse.json(extractedData);
    } else {
      throw new Error("Failed to fetch data from Wolfram Alpha");
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "An error occurred" });
  }
}

// async function findMathResponseInDatabase(inputEquation: string) {
//   const mathResponse = await prisma.mathResponse.findFirst({
//     where: {
//       input: inputEquation,
//     },
//   });

//   return mathResponse;
// }

// async function storeMathResponseInDatabase(
//   extractedData: ExtractedWolframData
// ) {
//   const mathResponse = await prisma.mathResponse.create({
//     data: {
//       input: extractedData.input,
//       solution: extractedData.solution,
//       intermediateSteps: extractedData.intermediateSteps,
//       plotImageURL: extractedData.plotImageURL,
//       numberLineURL: extractedData.numberLineURL,
//     },
//   });
//   console.log("Created math response with id: ", mathResponse.id);
// }

// function extractRelevantData(queryResult: QueryResult): ExtractedWolframData {
//   if (!queryResult || !queryResult.pods) {
//     throw new Error("Invalid query result structure");
//   }

//   const relevantData: ExtractedWolframData = {
//     input: queryResult.inputstring,
//     solution: "",
//     intermediateSteps: "",
//     plotImageURL: "",
//     numberLineURL: "",
//   };

//   queryResult.pods.forEach((pod) => {
//     if (!pod.subpods || pod.subpods.length === 0) {
//       return;
//     }

//     const firstSubpod = pod.subpods[0];

//     switch (pod.title) {
//       case "Solution":
//         relevantData.solution = firstSubpod?.plaintext || "";
//         break;
//       case "Result":
//         relevantData.intermediateSteps = firstSubpod?.plaintext || "";
//         break;
//       case "Plot":
//         relevantData.plotImageURL = firstSubpod?.img?.src || "";
//         break;
//       case "Number line":
//         relevantData.numberLineURL = firstSubpod?.img?.src || "";
//         break;
//     }
//   });

//   return relevantData;
// }

const extractDataFromPods = (queryResult: QueryResult) => {
  if (!queryResult.success) {
    throw new Error("Error in query result");
  }

  const extractedData: {
    inputString: string;
    podsData: PodData[];
    assumptions?: Assumptions[];
  } = {
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

  return extractedData;
};
