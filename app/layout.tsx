import { getChatMetaData } from "@/actions/chatActions";
import { Providers } from "@/components/auth-provider";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  const chatMetaData = await getChatMetaData();
  console.log(chatMetaData);
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
            <Sidebar chatMetaData={chatMetaData} />
            {children}
          </Providers>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
