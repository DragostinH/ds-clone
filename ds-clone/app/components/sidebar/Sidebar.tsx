import { ReactNode, useMemo } from "react";
async function Sidebar({ children, params }: { children: ReactNode; params: any }) {
  return (
    <aside className="h-full bg-white">
      <main className="h-full">
        {children}</main>
    </aside>
  );
}

export default Sidebar;
