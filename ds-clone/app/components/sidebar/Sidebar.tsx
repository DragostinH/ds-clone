import { ReactNode, useMemo } from "react";
import DesktopSidebar from "./Desktop/DesktopSidebar";
import getAuthUser from "@/app/actions/getAuthUser";
async function Sidebar({ children }: { children: ReactNode }) {
  const currentUser = await getAuthUser();

  return (
    <div className="h-full bg-white">
      <DesktopSidebar currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
