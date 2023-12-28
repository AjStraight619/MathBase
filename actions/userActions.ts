"use server";
import PasswordResetFormEmail from "@/email/password-reset-email";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const url =
  process.env.NODE_ENV === "production"
    ? "https://math-base.vercel.app"
    : "http://localhost:3000";

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

export const forgotPassword = async (formData: FormData) => {
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    return {
      error: "Invalid email",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      error: "This email is not registered",
    };
  }

  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
    },
  });

  try {
    const data = await resend.emails.send({
      from: "Password Reset <onboarding@resend.dev>",
      to: `${user.name} <${user.email}>`,
      subject: "Password Reset",
      reply_to: email,
      react: React.createElement(PasswordResetFormEmail, {
        message: `Click this link to reset your password: ${url}/reset-password/${token.token}`,
        senderEmail: email,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  redirect("/forgot-password/success");
};

export const resetPassword = async (token: string, data: FormData) => {
  const password = data.get("password");
  const confirmPassword = data.get("confirm");
  if (
    !password ||
    typeof password !== "string" ||
    password !== confirmPassword
  ) {
    return {
      error:
        "The passwords did not match. Please try retyping them and submitting again.",
    };
  }

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
      resetAt: null,
    },
  });

  if (!passwordResetToken) {
    return {
      error:
        "Invalid token reset request. Please try resetting your password again.",
    };
  }

  const encrypted = await hash(password, 12);

  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: encrypted,
    },
  });

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([updateUser, updateToken]);
  } catch (err) {
    console.error(err);
    return {
      error: `An unexpected error occured. Please try again and if the problem persists, contact support.`,
    };
  }
  redirect("/password-reset/success");
};
