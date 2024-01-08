import { ButtonCategories } from "./types";

export const cardData = [
  {
    href: "/register",
    title: "Get Started",
    description: "Get started with Math Base and learn how to use it.",
  },
  {
    href: "/about",
    title: "About",
    description: "Why I built Math Base and what it is all about.",
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Read the Math Base blog for the latest news and updates.",
  },
  {
    href: "/register",
    title: "Register",
    description: "Register for Math Base and start learning math.",
  },
] as const;

export const footerData = [
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/contact",
    title: "Contact",
  },
  {
    href: "/privacy",
    title: "Register",
  },
];

export const featureData = [
  {
    title: "React and Next.js",
    description:
      "Utilizing the latest in modern web development frameworks, Math Base offers a seamless and performant user experience.",
    icon: "FaReact",
  },
  {
    title: "GPT 4 Integration",
    description:
      "Incorporating OpenAI's GPT-4, Math Base leverages cutting-edge AI to provide intelligent and contextual math learning assistance.",
    icon: "SiNextdotjs",
  },
  {
    title: "Wolfram Alpha Integration",
    description:
      "Harnessing the computational intelligence of Wolfram Alpha, Math Base delivers precise and accurate mathematical computations and visualizations.",
    icon: "AiOutlineCalculator",
  },
];

export const buttonCategories: ButtonCategories = {
  basic: [
    { symbol: "+", latex: "+", wolfram: "+" },
    { symbol: "−", latex: "-", wolfram: "-" },
    { symbol: "×", latex: "\\times", wolfram: "*" },
    { symbol: "÷", latex: "\\div", wolfram: "/" },
    { symbol: "^", latex: "^", wolfram: "^" },
    { symbol: "=", latex: "=", wolfram: "=" },
    { symbol: "(", latex: "(", wolfram: "(" },
    { symbol: ")", latex: ")", wolfram: ")" },
  ],
  algebra: [
    { symbol: "x²", latex: "^2", wolfram: "x^2" },
    { symbol: "√x", latex: "\\sqrt{}", wolfram: "sqrt(x)" },
    { symbol: "log", latex: "\\log", wolfram: "log" },
    { symbol: "ln", latex: "\\ln", wolfram: "ln" },
  ],
  misc: [
    { symbol: "|x|", latex: "\\left| x \\right|", wolfram: "abs(x)" },
    { symbol: "∞", latex: "\\infty", wolfram: "infinity" },
    { symbol: "e", latex: "e", wolfram: "e" },
    { symbol: "π", latex: "\\pi", wolfram: "pi" },
    { symbol: "θ", latex: "\\theta", wolfram: "theta" },
  ],
  calculus: [
    { symbol: "∫", latex: "\\int", wolfram: "integrate" },
    { symbol: "d/dx", latex: "\\frac{d}{dx}", wolfram: "d/dx" },
    { symbol: "∑", latex: "\\sum", wolfram: "sum" },
    { symbol: "lim", latex: "\\lim", wolfram: "limit" },
  ],
  greek: [
    { symbol: "α", latex: "\\alpha", wolfram: "alpha" },
    { symbol: "β", latex: "\\beta", wolfram: "beta" },
    { symbol: "γ", latex: "\\gamma", wolfram: "gamma" },
    { symbol: "δ", latex: "\\delta", wolfram: "delta" },
  ],
} as const;
