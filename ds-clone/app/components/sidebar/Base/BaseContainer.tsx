"use client";

import UserList from "@/app/channels/messages/components/UserList";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

function BaseContainer({ children, users }: { children: ReactNode; users: User[] }) {
  const pathName = usePathname();

  useMemo(() => {
    console.log(pathName);
  }, [pathName]);
  console.log(pathName);
  return (
    <div className="base_ flex flex-col overflow-hidden relative grow">
      <div
        className="content_
        flex
        items-stretch
        justify-start
        min-w-0
        min-h-0
        flex-auto
        relative">
        <aside
          className="
        sidebar_
        flex 
        flex-col 
        min-h-0 
        w-60 
        flex-grow-0
        flex-shrink-0
        basis-auto
        overflow-hidden 
        bg-primary-100">
          <nav
            className="
          container_
          relative 
          overflow-hidden 
          flex 
          flex-col 
          border-[1px]"
            aria-label="server name">
            {pathName.startsWith("/channels/messages") ? <UserList users={users} /> : <div>Server name and channels</div>}
          </nav>
          <section
            className="
            user-panel_
            flex-grow-0
            flex-shrink-0
            basis-auto
            z-2">
            <div
              className="
              wrapper_
              relative
              overflow-visible
              "></div>
            <div
              className="
              h-14
              text-xs
              weight-500
              flex
              items-center
              relative
              border-[1px]
              border-black
              ">
              user panel
            </div>
          </section>
        </aside>
        <div
          className="
        chat_
        flex-auto
        min-w-0
        min-h-0
        flex
        flex-col
        relative
        overflow-hidden
        ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BaseContainer;
