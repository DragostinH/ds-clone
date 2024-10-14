import { ReactNode, useMemo } from "react";
import DesktopSidebar from "./DesktopSidebar";

async function Sidebar({ children }: { children: ReactNode }) {
  useMemo(() => {
    console.log("Sidebar rendered");
  }, []);
  return (
    <div className="h-full bg-white">
      <DesktopSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
