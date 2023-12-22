"use server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export const createNewUser = async (formData: FormData) => {
  const firstName = formData.get("firstName") as unknown as string;
  const lastName = formData.get("lastName") as unknown as string;
  const name = `${firstName} ${lastName}`;
  const email = formData.get("email") as unknown as string;
  const password = formData.get("password") as unknown as string;

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    throw new Error("Error creating new user");
  }
  redirect("/dashboard");
};
