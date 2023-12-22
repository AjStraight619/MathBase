"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const Login = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export const Logout = () => {
  return (
    <button className="dark:text-gray-50 text-black" onClick={() => signOut()}>
      Log out
    </button>
  );
};

export const Signup = () => {
  const router = useRouter();
  return <Button onClick={() => router.push("/register")}>Sign Up</Button>;
};
