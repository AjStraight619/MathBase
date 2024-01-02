import {
  advancedButtons,
  numericButtons,
  secondaryAdvancedButtons,
  simpleOperationButtons,
  variableButtons,
} from "@/lib/data";
import { Button } from "../ui/button";
import { CalculatorAction } from "./calculator";

type CalculatorButtonsProps = {
  mode: "basic" | "advanced" | "variables" | "advanced-secondary";
  setMode: (
    mode: "basic" | "advanced" | "variables" | "advanced-secondary"
  ) => void;
  dispatch: React.Dispatch<CalculatorAction>;
};

const modes: {
  label: string;
  value: "basic" | "advanced" | "variables" | "advanced-secondary";
}[] = [
  { label: "Basic", value: "basic" },
  { label: "Advanced", value: "advanced" },
  { label: "Variables", value: "variables" },
];

export default function CalculatorButtons({
  mode,
  setMode,
  dispatch,
}: CalculatorButtonsProps) {
  const renderButtons = () => {
    switch (mode) {
      case "basic":
        return numericButtons;
      case "advanced":
      case "advanced-secondary":
        return mode === "advanced" ? advancedButtons : secondaryAdvancedButtons;
      case "variables":
        return variableButtons;
      default:
        return [];
    }
  };

  return (
    <>
      <div className="flex justify-between mb-2 w-full">
        {/* Mode switching buttons */}
        <div className="grid grid-cols-3 gap-1 w-full">
          {modes.map((m) => (
            <Button
              key={m.label}
              onClick={() => setMode(m.value)}
              className="w-full"
            >
              {m.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex w-full">
        {/* Numeric, advanced, or variable buttons */}
        <div className="grid grid-cols-3 gap-2 flex-grow">
          {renderButtons().map((button) => (
            <Button key={button.label}>{button.label}</Button>
          ))}
        </div>
        {/* Simple operation buttons on the far right */}
        <div className="flex flex-col gap-1 ml-2">
          {simpleOperationButtons.map((button) => (
            <Button key={button.label} className="w-full">
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
