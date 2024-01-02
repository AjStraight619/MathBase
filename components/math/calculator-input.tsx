import { Input } from "../ui/input";
import { CalculatorAction } from "./calculator";

type CalculatorInputProps = {
  input: string;
  dispatch: React.Dispatch<CalculatorAction>;
  isLoading: boolean;
};

export default function CalculatorInput({
  input,
  dispatch,
  isLoading,
}: CalculatorInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Backspace" || key === "Delete") {
      e.preventDefault();
      if (input === "") return;
      dispatch({ type: "DELETE_DIGIT" });
    } else if (key.match(/[0-9]|\./)) {
      dispatch({ type: "ADD_DIGIT", payload: key });
    }
  };
  return (
    <form>
      <Input
        className="text-right"
        value={input}
        onKeyDown={handleKeyDown}
        placeholder="Enter an equation"
        disabled={isLoading}
      />
    </form>
  );
}
