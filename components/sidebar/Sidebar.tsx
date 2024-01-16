"use client";
import SearchBar from "@/components/ui/searchbar";
import { useSidebarContext } from "@/context/SidebarContext";
import { AllFolders, ListMetaData } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import SidebarChat from "../chat-interface/sidebar-chat";
import SidebarDashboard from "../dashboard-interface/sidebar-dashboard";
import SidebarHome from "../home/sidebar-home";
import SidebarNote from "../note-interface/sidebar-note";
import SidebarToggle from "../ui/sidebar-toggle";
import SidebarHeader from "./sidebar-header";
import UserOptions from "./user-options";

type SidebarProps = {
  chatMetaData: ListMetaData[];
  allFolders: AllFolders[];
};

/**
 * Sidebar component that includes navigation and chat options.
 * It conditionally renders different sections based on the current route.
 *
 * @param {Object} props - Component props.
 * @param {ListMetaData[]} props.chatMetaData - Metadata for chat items.
 * @param {AllFolders[]} props.allFolders - Data for all folders.
 */

const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      delay: 0.1,
    },
  },
};

export default function Sidebar({ chatMetaData, allFolders }: SidebarProps) {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  let mostRecentChatId = chatMetaData[0]?.id;
  if (!mostRecentChatId) mostRecentChatId = "New Chat";

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
    pathname === "/reset-password" ||
    pathname === "/" ||
    pathname === "/animations"
  )
    return null;
  const isHomePath = pathname === "/";
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isChatPath = pathname.startsWith("/chat");
  const isNotePath = pathname.startsWith("/note");

  return (
    <>
      {!isSidebarOpen && (
        <SidebarToggle
          className="fixed top-3 left-3"
          handleSidebarToggle={handleSidebarToggle}
        />
      )}

      {isSidebarOpen && (
        <AnimatePresence>
          <motion.div
            key="sidebar"
            initial="closed"
            animate={isSidebarOpen ? "open" : "closed"}
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-0 left-0 h-screen w-64 flex flex-col bg-background border-r z-50"
          >
            <SidebarHeader handleSidebarToggle={handleSidebarToggle} />
            {isDashboardPath && <SearchBar />}

            <div className="flex flex-col flex-1 overflow-y-auto px-2 py-8">
              {isChatPath ? (
                <SidebarChat
                  allFolders={allFolders}
                  chatMetaData={chatMetaData}
                />
              ) : isDashboardPath ? (
                <SidebarDashboard
                  allFolders={allFolders}
                  mostRecentChatId={mostRecentChatId}
                />
              ) : isHomePath ? (
                <SidebarHome mostRecentChatId={mostRecentChatId} />
              ) : isNotePath ? (
                <SidebarNote allFolders={allFolders} />
              ) : null}
            </div>

            <UserOptions />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
