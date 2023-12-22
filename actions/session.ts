"use server";

import { authOptions } from "@/lib/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  const userId = user.id;

  return userId;
};
