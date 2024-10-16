import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useConversation from "./useConversation";
import useChannels from "./useChannels";

const useSidebarRoutes = () => {
  // Top route is always going to be for direct messages
  // If the pathName is /messages or /messages/:conversationId
  // then the Messages route is active

  //Next we grab all the channels and create a route for each
  const pathName = usePathname();
  const { conversationId } = useConversation();
  const { channelId } = useChannels();

  // some fake routes

  const channels = [
    {
      label: "General",
      href: "/channels/general",
      icon: "",
      active: pathName === "/channels/general" || pathName === `/channels/general/${channelId}`,
    },
    {
      label: "Random",
      href: "/channels/random",
      icon: "",
      active: pathName === "/channels/random" || pathName === `/channels/random/${channelId}`,
    },
    {
      label: "Development",
      href: "/channels/development",
      icon: "",
      active: pathName === "/channels/development" || pathName === `/channels/development/${channelId}`,
    },
  ];

  const routes = useMemo(() => [...channels], [pathName, conversationId, channelId]);

  return routes;
};

export default useSidebarRoutes;
