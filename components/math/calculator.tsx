"use client";

import { motion } from "framer-motion";
import { useReducer, useState } from "react";
import { FaCalculator } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CalculatorButtons from "./calculator-buttons";
import CalculatorInput from "./calculator-input";

type CalculatorState = {
  currentValue: string;
  storedValue: string;
  currentOperation: string | null;
  isNewEntry: boolean;
};

export type CalculatorAction =
  | { type: "ADD_DIGIT"; payload: string }
  | { type: "SET_OPERATION"; payload: string }
  | { type: "CLEAR" }
  | { type: "DELETE_DIGIT" }
  | { type: "COMPUTE" }
  | { type: "TOGGLE_SIGN" }
  | { type: "ADD_DECIMAL" };

const initialState: CalculatorState = {
  currentValue: "",
  storedValue: "",
  currentOperation: null,
  isNewEntry: true,
};

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case "ADD_DIGIT":
      return {
        ...state,
        currentValue: state.currentValue + action.payload,
        isNewEntry: false,
      };
    case "SET_OPERATION":
      return {
        ...state,
        storedValue: state.currentValue,
        currentOperation: action.payload,
        currentValue: "",
        isNewEntry: true,
      };

    case "CLEAR":
      return {
        ...state,
        currentValue: "",
        storedValue: "",
        currentOperation: null,
        isNewEntry: true,
      };

    case "DELETE_DIGIT":
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };

    case "COMPUTE":
      const currentValue = parseFloat(state.currentValue);
      const storedValue = parseFloat(state.storedValue);
      let result = 0;

      switch (state.currentOperation) {
        case "+":
          result = storedValue + currentValue;
          break;
        case "-":
          result = storedValue - currentValue;
          break;
        case "*":
          result = storedValue * currentValue;
          break;
        case "/":
          result = storedValue / currentValue;
          break;
        default:
          break;
      }

      return {
        ...state,
        currentValue: result.toString(),
        storedValue: "",
        currentOperation: null,
        isNewEntry: true,
      };

    case "TOGGLE_SIGN":
      return {
        ...state,
        currentValue: (parseFloat(state.currentValue) * -1).toString(),
      };

    case "ADD_DECIMAL":
      return {
        ...state,
        currentValue: state.currentValue + ".",
      };

    default:
      return state;
  }
}

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<
    "basic" | "advanced" | "variables" | "advanced-secondary"
  >("basic");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.button
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, x: -25 }}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ opacity: 1, scale: 1.05 }}
        >
          <FaCalculator className="w-6 h-6 text-primary text-opacity-50 hover:text-opacity-100 hover:scale:110 ml-2" />
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">Calculator</DialogTitle>
        <CalculatorInput
          input={state.currentValue}
          dispatch={dispatch}
          isLoading={isLoading}
        />
        <CalculatorButtons mode={mode} setMode={setMode} dispatch={dispatch} />
      </DialogContent>
    </Dialog>
  );
}
