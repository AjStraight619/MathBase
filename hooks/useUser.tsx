import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { user: null, isUserLoading: true, error: null };
  }

  if (status === "unauthenticated") {
    return {
      user: null,
      isUserLoading: false,
      error: "User is not logged in.",
    };
  }

  if (status === "authenticated") {
    return { user: session.user as User, isUserLoading: false, error: null };
  }

  return { user: null, isUserLoading: false, error: null };
};
