import { ReactNode } from "react";

export default async function MessagesLayout({ children }: { children: ReactNode }) {
  return <div className="h-full">{children}</div>;
}
