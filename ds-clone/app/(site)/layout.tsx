import { ReactNode } from "react";
import NavigationSidebar from "../components/sidebar/NavigationSidebar";

export default async function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full border-2 ">
      <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
}
