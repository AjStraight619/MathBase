export const containerVariants = {
  open: {
    translateX: "4rem",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  closed: {
    translateX: "0rem",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
} as const;
