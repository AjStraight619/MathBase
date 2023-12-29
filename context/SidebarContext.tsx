"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SidebarProvider = {
  children: React.ReactNode;
};

type SidebarContext = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

const defaultSidebarContext: SidebarContext = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
};

const sidebarContext = createContext<SidebarContext>(defaultSidebarContext);

export default function SidebarProvider({ children }: SidebarProvider) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleResize = () => {
    setIsSidebarOpen(window.innerWidth > 975);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <sidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </sidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(sidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
