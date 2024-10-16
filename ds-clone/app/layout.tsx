import type { Metadata } from "next";
import "./globals.css";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ToasterContext from "./context/ToasterContext";
import LayoutFooter from "./(site)/components/Footer";

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
    <html lang="en">
      <body className="flex flex-col">
        <AuthContext>
          <ToasterContext />
          {children}
          <LayoutFooter />
        </AuthContext>
      </body>
    </html>
  );
}
