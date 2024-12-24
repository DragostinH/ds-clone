import type { Metadata } from "next";
import "./globals.css";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ToasterContext from "./context/ToasterContext";
import LayoutFooter from "./(site)/components/Footer";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "./libs/edgestore";
import { SocketProvider } from "@/components/providers/socket-provider";
import { SidebarProvider } from "@/components/providers/member-sidebar-provider";
import QueryProvider from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Discord for the next generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={cn("bg-white dark:bg-[#313338]")}>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            storageKey="discord-theme">
            <AuthContext>
              <ToasterContext />
              <SidebarProvider>
                <SocketProvider>
                  <ModalProvider />
                  <QueryProvider>{children}</QueryProvider>
                </SocketProvider>
              </SidebarProvider>
              {/* <LayoutFooter /> */}
            </AuthContext>
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
