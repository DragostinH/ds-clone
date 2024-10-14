import type { Metadata } from "next";
import "./globals.css";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ToasterContext from "./context/ToasterContext";

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
      <body className="">
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
        <footer className="absolute bottom-0 w-full text-center text-gray-500">
          {" "}
          © 2024 Discord Clone. Made with ❤️ by{" "}
          <a target="_blank" href="https://github.com/DragostinH/ds-clone">
            @DragostinH
          </a>
        </footer>
      </body>
    </html>
  );
}
