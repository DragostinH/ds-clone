import { ReactNode } from "react";

async function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <main className="">{children}</main>
    </div>
  );
}

export default Sidebar;
