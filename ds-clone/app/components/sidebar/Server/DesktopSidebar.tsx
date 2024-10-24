"use client";

import useSidebarRoutes from "@/app/hooks/useSidebarRoutes";
import DesktopSidebarItem from "./DesktopSidebarItem";
import { User } from "@prisma/client";
import AuthUserAvatar from "./AuthUserAvatar";
import MessagesRouteLink from "./MessagesRouteLink";
import LineSeparator from "./LineSeparator";

interface DesktopSidebarProps {
  currentUser?: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const sidebarRoutes = useSidebarRoutes();
  return (
    <div
      className="
      lg:fixed 
      lg:left-0 
      lg:inset-y-0 
      xl:px-6 
      lg:overflow-auto 
      lg:bg-white 
      lg:z-40 
      lg:w-20 
      lg:border-r-[1px]
      lg: pt-4
      lg:pb-4
      lg:flex
      lg:flex-col
      justify-between
      ">
      <nav
        className="flex flex-col items-center
        ">
        <span className="text-xs">messages</span>
        <MessagesRouteLink />
        {/* separator */}
        <LineSeparator />
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
      </nav>

      <nav
        className="
				flex
       	 		flex-col
        		items-center
        		">
        {/* <AuthUserAvatar
          name={currentUser?.name!}
          image={currentUser?.image!}
        /> */}
      </nav>
    </div>
  );
};

export default DesktopSidebar;
