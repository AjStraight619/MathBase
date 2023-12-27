"use client";
import { forgotPassword } from "@/actions/userActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | undefined>("");
  const handleAction = async (formData: FormData) => {
    const { error } = await forgotPassword(formData);
    setError(error);
  };

  return (
    <main className="max-w-xl px-4 mx-auto flex flex-col justify-center h-screen">
      <Card className="pt-4 px-4 relative">
        <form action={handleAction}>
          <CardContent className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold text-center">
              Reset password
            </h1>
            <p className="text-muted-foreground pb-3 text-sm">
              Enter your email address to get instructions for resetting your
              password.
            </p>
            <Input name="email" type="email" placeholder="Your email..." />
            <SubmitButton>Reset Password</SubmitButton>
            <Link
              href="/"
              className="text-sm text-muted-foreground flex items-center"
            >
              {error && <p className="text-red-500">{error}</p>}

              <Link
                className="flex flex-row hover:underline hover:text-primary items-center justify-center mt-4"
                href="/sign-in"
              >
                <CaretLeftIcon />
                <span>Return to Login</span>
              </Link>
            </Link>
          </CardContent>
        </form>
      </Card>
    </main>
  );
}
