"use client";

import useSidebarRoutes from "@/app/hooks/useSidebarRoutes";
import { ReactNode } from "react";
import DesktopSidebarItem from "./DesktopSidebarItem";

const DesktopSidebar = () => {
  const sidebarRoutes = useSidebarRoutes();
  return (
    <div className="">
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
    </div>
  );
};

export default DesktopSidebar;
