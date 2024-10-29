import { redirect } from "next/navigation";

import getAuthUser from "@/actions/getAuthUser";
import NavigationAction from "./NavigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DesktopSidebarItem } from "./Server/DesktopSidebarItem";
import MessagesRouteLink from "./Server/MessagesRouteLink";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./ModeToggle";
import getServers from "@/actions/getServers";

const NavigationSidebar = async () => {
  const session = await getAuthUser();
  if (!session) {
    redirect("/login");
  }
  const servers = await getServers();

  return (
    <div className="hidden md:flex space-y-4 flex-col items-center h-full text-primary-400 w-full dark:bg-[#1E1F22] py-3">
      <MessagesRouteLink />
      <Separator
        className="h-[1px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        color="primary-500"
      />
      <ScrollArea className="flex-1 w-full">
        {servers &&
          servers?.map((server) => {
            return (
              <DesktopSidebarItem
                key={server.id}
                id={server.id}
                name={server.name}
                imageUrl={server?.imageUrl as string}
              />
            );
          })}
        <NavigationAction />
      </ScrollArea>
      <ModeToggle />
      <LogoutButton />
    </div>
  );
};

export default NavigationSidebar;
