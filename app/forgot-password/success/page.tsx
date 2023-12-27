import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function SuccessPage() {
  return (
    <main className="max-w-xl px-4 mx-auto flex flex-col justify-center h-screen">
      <Card className="gap-4 flex flex-col p-4">
        <h1 className="text-2xl font-semibold text-center">Password Reset</h1>
        <p className="text-sm text-muted-foreground">
          If the email doesn't show up, check your spam folder.
        </p>
        <Button type="submit" asChild>
          <Link href="/sign-in">Return to Login</Link>
        </Button>
      </Card>
    </main>
  );
}
