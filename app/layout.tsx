import { getChatMetaData } from "@/actions/chatActions";
import { Providers } from "@/components/auth-provider";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { FileProvider } from "@/context/FileProvider";
import { authOptions } from "@/lib/authOptions";
import { ListMetaData } from "@/lib/types";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Math Base",
  description: "A solution for math students to learn and practice math.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let chatMetaData: ListMetaData[] = [];
  const session = await getServerSession(authOptions);
  if (session) {
    chatMetaData = await getChatMetaData();
  }

  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-background bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <FileProvider>
              <Sidebar chatMetaData={chatMetaData} />
              {children}
            </FileProvider>
            <Toaster />
          </Providers>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
