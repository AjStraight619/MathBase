"use client";

import SearchBar from "@/components/searchbar";
import { useSidebarContext } from "@/context/SidebarContext";
import { AllFolders, SidebarItem } from "@/lib/types";
import { User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Login, Signup } from "./auth";
import AvatarDropDown from "./avatar/avatar-dropdown";
import SidebarChat from "./chat-interface/sidebar-chat";
import SidebarDashboard from "./dashboard-interface/sidebar-dashboard";
import SidebarHome from "./home/sidebar-home";
import SidebarToggle from "./ui/sidebar-toggle";

type SidebarProps = {
  chatMetaData: SidebarItem[];
  allFolders: AllFolders[];
};

/**
 * Represents the sidebar component with navigation and chat options.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Children components.
 * @param {SidebarItem[]} props.chatMetaData - Metadata for chats.
 */

export default function Sidebar({ chatMetaData, allFolders }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as User;
  const userName = user?.name;
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  let mostRecentChatId = chatMetaData[0]?.id;
  if (!mostRecentChatId) mostRecentChatId = "New Chat";

  const sidebarVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (
    pathname === "/register" ||
    pathname === "/about" ||
    pathname === "/blog" ||
    pathname === "/sign-in" ||
    pathname === "/forgot-password" ||
    pathname == "/forgot-password/success" ||
    pathname === "/reset-password"
  )
    return null;

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isChatPath = pathname.startsWith("/chat");
  const isHomePath = pathname === "/";

  return (
    <>
      {!isSidebarOpen && (
        <SidebarToggle
          className="fixed top-3 left-3"
          handleSidebarToggle={handleSidebarToggle}
        />
      )}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-0 left-0 h-screen w-64 flex flex-col bg-background border-r z-30"
          >
            <div className="flex flex-row justify-between p-2">
              <h1 className="text-xl font-bold">
                <Link href="/">Math Base</Link>
              </h1>
              <SidebarToggle handleSidebarToggle={handleSidebarToggle} />
            </div>
            {isDashboardPath && <SearchBar />}

            <div className="flex flex-col flex-1 overflow-y-auto px-2 py-8">
              {isChatPath ? (
                <SidebarChat
                  allFolders={allFolders}
                  chatMetaData={chatMetaData}
                />
              ) : isDashboardPath ? (
                <SidebarDashboard
                  mostRecentChatId={mostRecentChatId}
                  pathname={pathname}
                />
              ) : isHomePath ? (
                <SidebarHome mostRecentChatId={mostRecentChatId} />
              ) : null}
            </div>

            {/* Auth buttons container */}
            <div className="p-4 mt-auto">
              {session ? (
                <AvatarDropDown usersName={userName} />
              ) : (
                <div className="flex flex-col space-y-2">
                  <Signup />
                  <Login />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
