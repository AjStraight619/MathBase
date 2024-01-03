"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMathModeContext } from "@/context/MathModeProvider";
import { usePathname } from "next/navigation";

export default function MathModeToggle() {
  const { toggleMathMode } = useMathModeContext();
  const pathname = usePathname();
  const handleChange = () => {
    toggleMathMode();
  };

  if (
    pathname === "/register" ||
    pathname === "/about" ||
    pathname === "/blog" ||
    pathname === "/sign-in" ||
    pathname === "/forgot-password" ||
    pathname === "/forgot-password/success" ||
    pathname === "/reset-password" ||
    pathname === "/" ||
    pathname.includes("dashboard") ||
    pathname.startsWith("/note")
  )
    return null;

  return (
    <div className="flex items-center space-x-2 fixed top-3 right-3">
      <Switch
        id="math-mode"
        defaultChecked={true}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="math-mode" className="text-muted-foreground">
        Math Mode
      </Label>
    </div>
  );
}
