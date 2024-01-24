import MathSubject from "@/components/math/math-button-selection";
import { Card, CardContent } from "@/components/ui/card";

export default function TestComponent() {
  return (
    <Card>
      <CardContent className="relative">
        <MathSubject />
      </CardContent>
    </Card>
  );
}
