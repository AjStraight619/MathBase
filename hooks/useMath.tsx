import { ExtractedWolframData } from "@/lib/types";
import { useQuery } from "react-query";

type MathResponse = ExtractedWolframData[];

const fetchEquationData = async (
  equations: string[]
): Promise<MathResponse> => {
  const queryParams = equations
    .map((eq) => `equation=${encodeURIComponent(eq)}`)
    .join("&");
  const response = await fetch(`/api/yourEndpointPath?${queryParams}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useMath = (equations: string[]) => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["fetchMath", equations.join(",")],
    () => fetchEquationData(equations),
    { enabled: false }
  );

  const fetchData = () => {
    refetch();
  };

  return { data, isLoading, isError, error, fetchData };
};
