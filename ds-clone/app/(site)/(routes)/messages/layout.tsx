import { ReactNode } from "react";

export default async function MessageLayout({ children }: { children: ReactNode }) {
  return <div className="h-full border-2  flex">{children}</div>;
}
