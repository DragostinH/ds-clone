import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getAuthUser from "../actions/getAuthUser";
import getUsers from "../actions/getUsers";
import ServerSidebar from "../components/sidebar/Server/ServerSidebar";
import BaseContainer from "../components/sidebar/Base/BaseContainer";
import NavigationSidebar from "../components/sidebar/NavigationSidebar";

export default async function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full border-2 border-red-900">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
}
