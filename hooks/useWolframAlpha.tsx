// import { fetcher } from "@/lib/utils";
// import useSWR from "swr";

// // Types for extracted Wolfram Alpha data
// export type ExtractedWolframData = {
//   input: string;
//   solution: string;
//   intermediateSteps: string;
//   plotImageURL: string;
//   numberLineURL: string;
// };

// /**
//  * Custom hook to fetch data from the server-side API which queries Wolfram Alpha.
//  *
//  * @param {string} equation - The equation to be processed
//  * @returns {object} - An object containing the fetched data and related states (loading, error, etc.)
//  */
// export const useWolframAlpha = (equation: string) => {
//   const { data, error, isValidating } = useSWR(
//     equation ? `/api/wolfram-alpha?equation=${equation}` : null,
//     fetcher,
//     {
//       revalidateOnReconnect: false,
//       refreshInterval: 0,
//     }
//   );

//   return {
//     wolframAlphaData: data as ExtractedWolframData | undefined,
//     isLoadingWolframAlpha: !error && !data,
//     isError: error,
//     isValidating,
//   };
// };
