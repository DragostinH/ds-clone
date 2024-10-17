"use client";

import { User } from "@prisma/client";
import LineSeparator from "./LineSeparator";
import MessagesRouteLink from "./MessagesRouteLink";
import React from "react";
import useSidebarRoutes from "@/app/hooks/useSidebarRoutes";
import DesktopSidebarItem from "./DesktopSidebarItem";

interface ServerSidebarProps {
  currentUser?: User;
}

const ServerSidebar: React.FC<ServerSidebarProps> = ({ currentUser }) => {
  const sidebarRoutes = useSidebarRoutes();
  return (
    <nav
      className="
    w-[72px] 
    relative 
    shrink-0 
    overflow-y-hidden
    overflow-x-hidden 
    flex 
    flex-col 
    border-[1px]">
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
            <span className="text-xs">Channels</span>
            {sidebarRoutes.map((route) => {
              return (
                <DesktopSidebarItem
                  key={route.label}
                  label={route.label}
                  href={route.href}
                  icon={route.icon}
                  active={route.active}
                />
              );
            })}
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default ServerSidebar;
