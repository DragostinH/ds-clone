"use client";

import { User } from "@prisma/client";
import LineSeparator from "./LineSeparator";
import MessagesRouteLink from "./MessagesRouteLink";
import React from "react";
import useSidebarRoutes from "@/app/hooks/useSidebarRoutes";
import { DesktopSidebarItem } from "./DesktopSidebarItem";
import LogoutButton from "../LogoutButton";

interface ServerSidebarProps {
  currentUser?: User;
}

const ServerSidebar: React.FC<ServerSidebarProps> = ({ currentUser }) => {
  const sidebarRoutes = useSidebarRoutes();
  return (
    <nav
      className="
    h-full
    w-[72px] 
    shrink-0 
    inset-y-0
    fixed
    overflow-y-hidden
    overflow-x-hidden 
    flex 
    flex-col 
    z-30">
      <ul
        className="
        flex
        flex-col
        list-none
        h-full
        relative
        items-center
      ">
        <div
          className="
        overflow-hidden
        pr-0
        ">
          <MessagesRouteLink />
          <LineSeparator />
          {/* Server list */}
          <ul
            role="list"
            className="
          flex
          flex-col
          space-y-1
          gap-2
          mt-2
          ">
      
          </ul>
        </div>
      </ul>
      <LogoutButton />
    </nav>
  );
};

export default ServerSidebar;
