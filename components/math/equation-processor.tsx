type EquationProcessorProps = {
  extractedEquations: string[];
  setIsExtractedEquation: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EquationProcessor({
  extractedEquations,
  setIsExtractedEquation,
}: EquationProcessorProps) {
  //   const { wolframAlphaData, isLoadingWolframAlpha, isError, isValidating } =
  //     useWolframAlpha(extractedEquations[0]);

  console.log(
    "These are the extractd equations in EquationProcessor",
    extractedEquations
  );

  return <div>Hello</div>;
}
