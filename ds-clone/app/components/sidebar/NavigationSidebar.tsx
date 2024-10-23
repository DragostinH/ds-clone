import { redirect } from "next/navigation";

import getAuthUser from "@/app/actions/getAuthUser";
import getUserServers from "@/app/actions/getUserServers";
import NavigationAction from "./NavigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DesktopSidebarItem } from "./Server/DesktopSidebarItem";
import MessagesRouteLink from "./Server/MessagesRouteLink";
import LoggedUserBox from "./Base/LoggedUserBox";
import LogoutButton from "./LogoutButton";

const NavigationSidebar = async () => {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/login");

  //   const servers = getUserServers();

  // dummy servers data:

  const servers = [
    {
      id: "1",
      name: "Server 1",
      image: "https://picsum.photos/200",
    },
    {
      id: "2",
      name: "Server 2",
      image: "https://picsum.photos/200",
    },
    {
      id: "3",
      name: "Server 3",
      image: "https://",
    },
    {
      id: "4",
      name: "Server 4",
      image: "https://picsum.photos/200",
    },
    {
      id: "5",
      name: "Server 5",
      image: "https://picsum.photos/200",
    },
    {
      id: "6",
      name: "Server 6",
      image: "https://picsum.photos/200",
    },
    {
      id: "7",
      name: "Server 7",
      image: "https://picsum.photos/200",
    },
    {
      id: "8",
      name: "Server 8",
      image: "https://picsum.photos/200",
    },
    {
      id: "9",
      name: "Server 9",
      image: "https://picsum.photos/200",
    },
    {
      id: "10",
      name: "Server 10",
      image: "https://picsum.photos/200",
    },
  ];
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary-400 w-full dark:bg-[#1E1F22] py-3">
      <MessagesRouteLink />
      <Separator
        className="h-[1px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
        color="primary-500"
      />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => {
          return (
            <DesktopSidebarItem
              key={server.id}
              id={server.id}
              name={server.name}
              imageUrl={server.image}
            />
          );
        })}
        <NavigationAction />
      </ScrollArea>
      <LogoutButton />
    </div>
  );
};

export default NavigationSidebar;
