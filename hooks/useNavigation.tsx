import { usePathname } from "next/navigation";

export const useNavigation = () => {
  const pathname = usePathname();
  const fullPath = pathname.split("/");
  return fullPath;
};
