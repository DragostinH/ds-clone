import React from "react";

import getAuthUser from "@/actions/getAuthUser";

import { ChannelType, MemberRole } from "@prisma/client";
import client from "@/app/libs/prismadb";

import { redirect } from "next/navigation";
import ServerHeader from "./ServerHeader";
import ServerSearch from "./ServerSearch";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";

import { Hash, Mic, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChannelsSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const ChannelsSidebar: React.FC<ChannelsSidebarProps> = async ({ serverId }) => {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");

  if (!serverId) return redirect("/messages");

  console.log("[CHANNEL_SIDEBAR_SERVER_ID]", serverId);

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

  const role = server?.members.find((member) => member.userId === authUser.id)?.role;

  return (
    <div className="flex flex-col z-40 h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <p>SERVERID: {serverId}</p>
      <ServerHeader
        server={server}
        role={role}
      />
      <ScrollArea className="flex-1 px-3">
        {/* Search */}
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },

              {
                label: "Voice Channels",
                type: "channel",
                data: voiceChannels?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },

              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },

              // Moved members to a separate part of the layout
              // {
              //   label: "Members",
              //   type: "member",
              //   data: members?.map((member) => ({
              //     icon: roleIconMap[member.role],
              //     name: member.user.nickname,
              //     id: member.user.id,
              //   })),
              // },
            ]}
          />
        </div>

        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {/* Channels */}
        {textChannels.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="Text Channels"
              role={role}
              sectionType="channels"
              channelType={ChannelType.TEXT}
              server={server}
            />

            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {videoChannels.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="Voice Channels"
              role={role}
              sectionType="channels"
              channelType={ChannelType.VOICE}
              server={server}
            />

            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {voiceChannels.length > 0 && (
          <div className="mb-2">
            <ServerSection
              label="Voice Channels"
              role={role}
              sectionType="channels"
              channelType={ChannelType.VOICE}
              server={server}
            />

            {voiceChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChannelsSidebar;
