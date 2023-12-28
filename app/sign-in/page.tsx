import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { Login } from "./Login";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  console.log(providers);

  if (session) {
    redirect("/");
  }

  return <Login providers={Object.values(providers ?? [])} />;
}
