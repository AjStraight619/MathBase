"use client";
import { resetPassword } from "@/actions/userActions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function PasswordResetPage({
  params,
}: {
  params: { token: string };
}) {
  const [error, setError] = useState<string | undefined>("");
  const submitForm = async (formData: FormData) => {
    const { error } = await resetPassword(params.token, formData);
    setError(error);
  };

  return (
    <main className="max-w-xl px-4 mx-auto flex flex-col justify-center h-screen">
      <Card className="gap-4 flex flex-col">
        <form action={submitForm}>
          <h1 className="text-2xl font-light">Choose a new password</h1>
          <p>You can reset your password here.</p>
          <Input name="password" type="password" placeholder="Password" />
          <Input
            name="confirm"
            type="password"
            placeholder="Confirm password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <SubmitButton>Reset Password</SubmitButton>
          <Link
            href="/api/auth/signin"
            className="text-sm text-muted-foreground flex items-center"
          >
            <CaretLeftIcon />
            <span>Return to Login</span>
          </Link>
        </form>
      </Card>
    </main>
  );
}
