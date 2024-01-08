"use client";

import { useState } from "react";

type ButtonCategory = keyof typeof buttonCategories;

type MathButtonsProps = {
  mathInput: string;
  onMathSymbolClick: (symbol: string) => void;
};

const basicButtons = [
  { symbol: "+", wolfram: "+" },
  { symbol: "−", wolfram: "-" },
  { symbol: "×", wolfram: "*" },
  { symbol: "÷", wolfram: "/" },
  { symbol: "^", wolfram: "^" },
  { symbol: "=", wolfram: "=" },
  { symbol: "(", wolfram: "(" },
  { symbol: ")", wolfram: ")" },
];

const algebraButtons = [
  { symbol: "x²", wolfram: "^2" },
  { symbol: "√x", wolfram: "sqrt(x)" },
  { symbol: "log", wolfram: "log" },
  { symbol: "ln", wolfram: "ln" },
];

const calculusButtons = [
  { symbol: "∫", wolfram: "integrate" },
  { symbol: "d/dx", wolfram: "d/dx" },
  { symbol: "∑", wolfram: "sum" },
  { symbol: "lim", wolfram: "limit" },
];

const miscButtons = [
  { symbol: "|x|", wolfram: "abs" },
  { symbol: "∞", wolfram: "infinity" },
  { symbol: "e", wolfram: "e" },
  { symbol: "π", wolfram: "pi" },
  { symbol: "θ", wolfram: "theta" },
];

const greekButtons = [
  { symbol: "α", wolfram: "alpha" },
  { symbol: "β", wolfram: "beta" },
  { symbol: "γ", wolfram: "gamma" },
  { symbol: "δ", wolfram: "delta" },
];

const buttonCategories = {
  algebra: algebraButtons,
  calculus: calculusButtons,
  misc: miscButtons,
  greek: greekButtons,
};

export default function MathButtons({ onMathSymbolClick }: MathButtonsProps) {
  const [currentCategory, setCurrentCategory] =
    useState<ButtonCategory>("algebra");

  return (
    <div className="mb-2">
      {Object.keys(buttonCategories).map((category) => (
        <button
          key={category}
          onClick={() => setCurrentCategory(category as ButtonCategory)}
          className={`p-2 m-2 hover:text-primary ${
            currentCategory === category
              ? "text-primary"
              : "text-muted-foreground/40"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
      <>
        <p className="mb-2">
          {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
        </p>
      </>
      <div className="flex flex-col space-y-2  w-full">
        <div className="grid grid-cols-4 gap-2 mb-2">
          {basicButtons.map((button) => (
            <button
              onClick={() => onMathSymbolClick(button.symbol)}
              key={button.symbol}
              className="p-2 border rounded shadow"
            >
              {button.symbol}
            </button>
          ))}

          {buttonCategories[currentCategory].map((button) => (
            <>
              <button
                onClick={() => onMathSymbolClick(button.symbol)}
                key={button.symbol}
                className="p-2 border rounded shadow"
              >
                {button.symbol}
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
