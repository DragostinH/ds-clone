import getAuthUser from "@/actions/getAuthUser";
import getServerById from "@/actions/getServerById";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";
import client from "@/app/libs/prismadb";

interface ChannelsSidebarProps {
  serverId: string;
}

const ChannelsSidebar: React.FC<ChannelsSidebarProps> = async ({ serverId }) => {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");

  const server = await client?.server.findFirst({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) return redirect("/messages");

  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
  const voiceChannels = server?.channels.filter((channel) => channel.type === ChannelType.VOICE);
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
  const members = server?.members.filter((member) => member.userId !== authUser.id);

  const role = server?.members.find((member) => member.userId === authUser.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader
        server={server}
        role={role}
      />
    </div>
  );
};

export default ChannelsSidebar;
