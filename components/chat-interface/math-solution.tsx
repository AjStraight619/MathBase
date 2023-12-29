import { useMath } from "@/hooks/useMath";
import { FaCalculator } from "react-icons/fa";

type MathSolutionProps = {
  mathContent: string;
};

export default function MathSolution({ mathContent }: MathSolutionProps) {
  const { data, fetchData } = useMath([mathContent]);

  return (
    <button
      onClick={() => fetchData()}
      className="group absolute transition-all"
    >
      <FaCalculator className="w-8 h-8 text-primary-foreground text-opacity-50 hover:text-opacity-100 hover:scale:105" />
    </button>
  );
}
