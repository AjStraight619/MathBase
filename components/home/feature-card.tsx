import { Card, CardContent, CardTitle } from "../ui/card";

type FeatureCardProps = {
  title: string;
  description: string;
  href?: string;
  icon?: JSX.Element;
};

const topColors = [
  {
    name: "React and Next.js",
    gradientClass: "bg-gradient-to-r from-blue-500 to-cyan-300",
  },
  {
    name: "GPT 4 Integration",
    gradientClass: "bg-gradient-to-r from-purple-400 to-pink-300",
  },
  {
    name: "Wolfram Alpha Integration",
    gradientClass: "bg-gradient-to-r from-orange-500 to-yellow-300",
  },
];

export default function FeatureCard({
  title,
  description,
  href,
  icon,
}: FeatureCardProps) {
  const gradientClass = topColors.find(
    (color) => color.name === title
  )?.gradientClass;
  return (
    <Card className="h-[16rem] p-4 relative">
      <CardContent>
        {gradientClass && (
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-[0.05rem] w-[10rem] ${gradientClass}`}
          ></div>
        )}
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="font-semibold">{title}</CardTitle>
          <span className="text-4xl">{icon}</span>
        </div>
        <p className="text-muted-foreground mt-4 sm:text-sm md:text-md">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
