import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default async function MessagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
