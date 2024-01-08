import Link from "next/link";
import { PiArrowSquareOutBold } from "react-icons/pi";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

type UserActionCardProps = {
  name: string;
  description: string;
  route: string;
  icon?: JSX.Element;
};

export default function UserActionCard({
  name,
  description,
  route,
  icon,
}: UserActionCardProps) {
  return (
    <Link href={route}>
      <Card className="group h-auto p-2 relative bg-transparent border-none transition hover:scale-110">
        <CardContent>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="mt-2">
            {description}
            <PiArrowSquareOutBold className="absolute top-0 right-0 z-2 w-5 h-5 text-muted-foreground opacity-70 group-hover:translate-x-1 transition" />
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
