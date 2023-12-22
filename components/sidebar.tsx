"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Login, Signup } from "./auth";
import AvatarDropDown from "./avatar/AvatarDropDown";

type SidebarProps = {
  children?: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  if (!session) return null;
  const user = session?.user as User;
  const userName = user?.name;

  if (pathname === "/" || pathname === "/register") return null;

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-48  flex flex-col border border-r bg-background`}
    >
      <h1 className="text-xl font-bold p-4">Math Base</h1>
      <div className="overflow-y-auto px-2 py-8">
        <nav>{children}</nav>

        <div className="absolute bottom-0 w-full py-4 bg-none">
          {session ? (
            <AvatarDropDown usersName={userName} />
          ) : (
            <div className="flex flex-col items-center space-y-2 text-lg font-bold">
              <Signup />
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
