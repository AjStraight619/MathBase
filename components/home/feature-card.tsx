import { Card, CardContent, CardTitle } from "../ui/card";

type FeatureCardProps = {
  title: string;
  description: string;
  href?: string;
  icon?: JSX.Element;
};

export default function FeatureCard({
  title,
  description,
  href,
  icon,
}: FeatureCardProps) {
  return (
    <Card className="h-[16rem] p-4">
      <CardContent>
        <div className="flex flex-row items-center justify-evenly">
          <CardTitle className="font-semibold">{title}</CardTitle>
          <span className="text-4xl">{icon}</span>
        </div>
        <p className="text-muted-foreground mt-4">{description}</p>
      </CardContent>
    </Card>
  );
}
