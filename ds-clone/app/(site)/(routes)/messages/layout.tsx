import getAuthUser from "@/actions/getAuthUser";
import UsersSidebar from "@/app/components/sidebar/Messages/UsersSidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function MessageLayout({ children }: { children: ReactNode }) {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");

  return (
    <div className="h-full flex">
      <aside className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <UsersSidebar />
      </aside>
      <main>{children}</main>
    </div>
  );
}
