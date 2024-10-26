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
              <ModalProvider />
              {children}
              <LayoutFooter />
            </AuthContext>
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
