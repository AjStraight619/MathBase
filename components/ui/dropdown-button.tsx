import { motion } from "framer-motion";
type DropdownButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isOpen: boolean;
};

export default function DropdownButton({
  children,
  onClick,
  isOpen,
}: DropdownButtonProps) {
  return (
    <motion.button
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
