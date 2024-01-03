import { motion } from "framer-motion";
import Link from "next/link";
import Icon from "../icon/icon";
import SidebarToggle from "../ui/sidebar-toggle";

type SidebarHeaderProps = {
  handleSidebarToggle: () => void;
};

export default function SidebarHeader({
  handleSidebarToggle,
}: SidebarHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 10,
      }}
    >
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-row items-center gap-2">
          <Icon
            height={50}
            width={50}
            className="rounded-full object-cover  shadow-xl z-50"
          />
          <motion.h1 className="text-xl font-bold">
            <Link href="/">Math Base</Link>
          </motion.h1>
        </div>
        <SidebarToggle handleSidebarToggle={handleSidebarToggle} />
      </div>
    </motion.div>
  );
}
