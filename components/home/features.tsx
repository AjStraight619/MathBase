import { AiOutlineCalculator } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";

import FeatureCard from "./feature-card";
import PoweredBy from "./powered-by";

export const featureData = [
  {
    title: "React and Next.js",
    description:
      "Utilizing the latest in modern web development frameworks, Math Base offers a seamless and performant user experience.",
    icon: <FaReact className="text-blue-400" />,
  },
  {
    title: "GPT 4 Integration",
    description:
      "Incorporating OpenAI's GPT-4, Math Base leverages cutting-edge AI to provide intelligent and contextual math learning assistance.",
    icon: <RiOpenaiFill className="text-green-600" />,
  },
  {
    title: "Wolfram Alpha Integration",
    description:
      "Harnessing the computational intelligence of Wolfram Alpha, Math Base delivers precise and accurate mathematical computations and visualizations.",
    icon: <AiOutlineCalculator className="text-orange-500" />,
  },
];

export default function Features() {
  return (
    <div className="flex flex-col items-center">
      <PoweredBy />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 w-full">
        {featureData.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}
