"use client";

import { useMathModeContext } from "@/context/MathModeProvider";
import { motion } from "framer-motion";
import { forwardRef, useRef, useState } from "react";
import MathButtons from "../math/math-buttons";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

type MathKeyboardProps = {
  showMathKeyboard: boolean;
  toggleMathKeyboard: () => void;
};

const MathKeyboard = forwardRef<HTMLInputElement, MathKeyboardProps>(
  ({ showMathKeyboard, toggleMathKeyboard }, ref) => {
    const { mathMode } = useMathModeContext();
    const [mathInput, setMathInput] = useState("");
    const mathInputRef = useRef<HTMLInputElement>(null);

    const handleMathInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setMathInput(value);
    };

    const onMathSymbolClick = (symbol: string) => {
      setMathInput((prev) => prev + symbol);
    };

    return (
      <>
        {showMathKeyboard && mathMode && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 0.3,
              stiffness: 100,
              bounce: 0.1,
            }}
            exit={{ opacity: 0, decelerate: 0.5 }}
            className="mb-2 mx-auto max-w-xl"
          >
            <Card className="p-2 relative">
              <CardContent>
                <Input
                  ref={mathInputRef}
                  value={mathInput}
                  onChange={handleMathInputChange}
                  className="text-right"
                />
                <MathButtons
                  mathInput={mathInput}
                  onMathSymbolClick={onMathSymbolClick}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </>
    );
  }
);

MathKeyboard.displayName = "MathKeyboard";

export default MathKeyboard;
