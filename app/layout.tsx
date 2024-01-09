import { getChatMetaData } from "@/actions/chatActions";
import { getAllFolders } from "@/actions/noteActions";
import { Providers } from "@/components/auth/auth-provider";
import MathModeToggle from "@/components/math/math-mode-toggle";
import Sidebar from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import DialogTriggerProvider from "@/context/DialogTriggerContext";
import { FileProvider } from "@/context/FileProvider";
import MathModeProvider from "@/context/MathModeProvider";
import ReactQueryProvider from "@/context/QueryClientProvider";
import SidebarProvider from "@/context/SidebarContext";
import { getUserSession } from "@/lib/session";
import { AllFolders, ListMetaData } from "@/lib/types";
import type { Metadata } from "next";
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
  let allFolders: AllFolders[] = [];

  const user = await getUserSession();
  if (user) {
    chatMetaData = (await getChatMetaData()) as unknown as ListMetaData[];
    allFolders = (await getAllFolders()) as unknown as AllFolders[];
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} dark:bg-background bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <FileProvider>
              <MathModeProvider>
                <SidebarProvider>
                  <ReactQueryProvider>
                    <DialogTriggerProvider>
                      <Sidebar
                        allFolders={allFolders}
                        chatMetaData={chatMetaData ?? []}
                      />

                      {children}
                    </DialogTriggerProvider>
                  </ReactQueryProvider>
                </SidebarProvider>
                <MathModeToggle />
              </MathModeProvider>
            </FileProvider>
            <Toaster />
          </Providers>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
