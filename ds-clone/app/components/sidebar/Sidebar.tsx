import { ReactNode, useMemo } from "react";
import DesktopSidebar from "./Server/DesktopSidebar";
async function Sidebar({ children, params }: { children: ReactNode; params: any }) {
  return (
    <aside className="h-full bg-white">
      {/* <DesktopSidebar currentUser={currentUser!} /> */}
      <main className="h-full">
        {children}</main>
    </aside>
  );
}

export default Sidebar;
