import { motion } from "framer-motion";
import Image from "next/image";

export default function Icon() {
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
      <Image
        src="/logo.png"
        alt="Math Base"
        width="192"
        height="192"
        quality="95"
        priority={true}
        className="h-24 w-24 rounded-md object-cover border-[0.35rem] border-white shadow-xl z-50"
      />
    </motion.div>
  );
}
