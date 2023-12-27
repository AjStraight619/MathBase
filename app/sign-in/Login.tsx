"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import SubmitButton from "@/components/ui/submit-button";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaApple, FaDiscord, FaGoogle } from "react-icons/fa";

const providers = [
  {
    id: "google",
    name: "Google",
    icon: <FaGoogle />,
  },
  {
    id: "discord",
    name: "Discord",
    icon: <FaDiscord />,
  },
  {
    id: "apple",
    name: "Apple",
    icon: <FaApple />,
  },
];

export const Login = ({ providers }: { providers: ClientSafeProvider[] }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen justify-center items-center">
      <Card className="p-4 w-[25rem]">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <h1 className="text-2xl font-semibold text-center">Sign In</h1>
          <Input
            onChange={handleFormChange}
            name="email"
            type="text"
            placeholder="Email"
            className="input"
          />
          <Input
            onChange={handleFormChange}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          <div className="flex flex-row justify-between items-center">
            <SubmitButton>Sign in</SubmitButton>
            <span className="text-muted-foreground text-sm">
              Forgot Password?{" "}
              <Link
                className="hover:underline hover:text-primary"
                href="/forgot-password"
              >
                Reset
              </Link>
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-full space-y-2">
            <p className="text-muted-foreground">Or</p>
            <Separator className="w-full" />
            {providers?.map(
              (provider) =>
                provider.id !== "credentials" && renderSignInOption(provider)
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

const renderSignInOption = (provider: ClientSafeProvider) => {
  const providerIcon = providers.find((p) => p.id === provider.id)?.icon;
  return (
    <Button
      className="flex flex-row gap-2 justify-center items-center w-[15rem]"
      variant="secondary"
      key={provider.id}
      onClick={() => signIn(provider.id)}
    >
      {providerIcon}
      <span>Sign in with {provider.name}</span>
    </Button>
  );
};
