"use client";
import { createNewUser } from "@/actions/userActions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import Link from "next/link";
import { useState } from "react";

type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const [form, setForm] = useState<UserForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addUser = async (formData: FormData) => {
    if (!isPasswordMatch()) {
      return;
    }
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("password", form.password);

    const newUser = await createNewUser(formData);
    console.log(newUser);
  };

  const isPasswordMatch = () => {
    return form.password === form.confirmPassword;
  };

  return (
    <Card className="w-[25rem]">
      <CardHeader>
        <CardTitle className="text-center">
          Create Your Math Base Account
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <form action={addUser} className="p-4">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            required
            id="firstName"
            name="firstName"
            onChange={handleFormChange}
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            required
            id="lastName"
            name="lastName"
            onChange={handleFormChange}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            required
            type="email"
            id="email"
            name="email"
            onChange={handleFormChange}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type="password"
            id="password"
            name="password"
            onChange={handleFormChange}
          />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleFormChange}
          />

          <SubmitButton className="w-full items-center justify-center mt-4">
            Register
          </SubmitButton>
        </form>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/api/auth/signin"
            className="text-accent hover:underline dark:hover:text-gray-50"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
