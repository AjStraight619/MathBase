"use client";
import { useMathModeContext } from "@/context/MathModeProvider";
import { Label } from "./label";
import { Switch } from "./switch";

export default function MathModeToggle() {
  const { mathMode, toggleMathMode } = useMathModeContext();
  const handleChange = () => {
    toggleMathMode();
    console.log("math mode toggled", mathMode);
  };
  return (
    <div className="flex items-center space-x-2 fixed top-3 right-3">
      <Switch
        id="math-mode"
        defaultChecked={true}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="math-mode" className="text-muted-foreground">
        Math Mode
      </Label>
    </div>
  );
}
