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
      label: "Channels",
      href: "/channels",
      icon: "",
      active: pathName === "/channels" || pathName === `/channels/${channelId}`,
    },
  ];

  const routes = useMemo(
    () => [
      {
        label: "Messages",
        href: "/channels/messages",
        icon: "",
        active:
          pathName === "/channels/messages" ||
          pathName === `/channels/messages/${conversationId}`,
      },
      ...channels,
    ],
    [pathName, conversationId, channelId]
  );

  return routes;
};

export default useSidebarRoutes;
