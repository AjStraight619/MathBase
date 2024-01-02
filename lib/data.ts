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

export const operationButtons = [
  { label: "^", value: "^", type: "operation" },
  { label: "(", value: "(", type: "operation" },
  { label: ")", value: ")", type: "operation" },
  { label: "π", value: "pi", type: "operation" },
  { label: "e", value: "e", type: "operation" },
];

export const simpleOperationButtons = [
  { label: "C", value: "CLEAR", type: "operation" },
  { label: "+", value: "+", type: "operation" },
  { label: "-", value: "-", type: "operation" },
  { label: "*", value: "*", type: "operation" },
  { label: "/", value: "/", type: "operation" },
  { label: "=", value: "=", type: "operation" },
];

export const numericButtons = [
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "0", value: "0", type: "number" },
  { label: ".", value: ".", type: "number" },
];

export const variableButtons = [
  { label: "x", value: "x", type: "variable" },
  { label: "y", value: "y", type: "variable" },
  { label: "z", value: "z", type: "variable" },
];

export const advancedButtons = [
  { label: "sin", value: "sin", type: "advanced" },
  { label: "cos", value: "cos", type: "advanced" },
  { label: "tan", value: "tan", type: "advanced" },

  { label: "log", value: "log", type: "advanced" },
  { label: "ln", value: "ln", type: "advanced" },
  { label: "sqrt", value: "sqrt", type: "advanced" },
  { label: "abs", value: "abs", type: "advanced" },
  { label: "floor", value: "floor", type: "advanced" },
  { label: "∫", value: "integral", type: "advanced" },
  { label: "d/dx", value: "derivative", type: "advanced" },
];

export const secondaryAdvancedButtons = [
  { label: "asin", value: "asin", type: "advanced" },
  { label: "acos", value: "acos", type: "advanced" },
  { label: "atan", value: "atan", type: "advanced" },
  { label: "sinh", value: "sinh", type: "advanced" },
  { label: "cosh", value: "cosh", type: "advanced" },
  { label: "tanh", value: "tanh", type: "advanced" },
  { label: "asinh", value: "asinh", type: "advanced" },
  { label: "acosh", value: "acosh", type: "advanced" },
  { label: "atanh", value: "atanh", type: "advanced" },
];
