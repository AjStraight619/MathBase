"use client";

import { SidebarItem } from "@/lib/types";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Login, Signup } from "./auth";
import AvatarDropDown from "./avatar/avatar-dropdown";
import SidebarChat from "./chat-interface/sidebar-chat";
import SearchBar from "./dashboard-interface/searchbar";
import SidebarDashboard from "./dashboard-interface/sidebar-dashboard";
import SidebarHome from "./home/sidebar-home";
import SidebarToggle from "./ui/sidebar-toggle";

type SidebarProps = {
  children?: React.ReactNode;
  chatMetaData: SidebarItem[];
};

export default function Sidebar({ children, chatMetaData }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as User;
  const userName = user?.name;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let mostRecentChatId = chatMetaData[0]?.id;
  if (!mostRecentChatId) mostRecentChatId = "New Chat";

  const sidebarVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (pathname === "/register" || pathname === "/about" || pathname === "/blog")
    return null;

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isChatPath = pathname.startsWith("/chat");
  const isHomePath = pathname === "/";

  return (
    <>
      {!isSidebarOpen && (
        <SidebarToggle
          className="fixed top-2 left-2"
          handleSidebarToggle={handleSidebarToggle}
        />
      )}

      <motion.div
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        exit="closed"
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed top-0 left-0 h-screen w-48 flex flex-col border border-r bg-background`}
      >
        <div className="flex flex-row justify-between p-2">
          <h1 className="text-xl font-bold">
            <Link href="/">Math Base</Link>
          </h1>
          <SidebarToggle handleSidebarToggle={handleSidebarToggle} />
        </div>
        {isDashboardPath && <SearchBar />}

        <div className="overflow-y-auto px-2 py-8">
          {isChatPath ? (
            <SidebarChat chatMetaData={chatMetaData} />
          ) : isDashboardPath ? (
            <SidebarDashboard
              mostRecentChatId={mostRecentChatId}
              pathname={pathname}
            />
          ) : isHomePath ? (
            <SidebarHome mostRecentChatId={mostRecentChatId} />
          ) : null}

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
      </motion.div>
    </>
  );
}
