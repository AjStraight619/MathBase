import { usePathname } from "next/navigation";

export const useItemId = () => {
  const pathname = usePathname();
  const itemId = pathname.split("/")[2];
  return itemId;
};
