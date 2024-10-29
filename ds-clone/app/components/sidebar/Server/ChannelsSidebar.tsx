import getAuthUser from "@/actions/getAuthUser";
import getServerById from "@/actions/getServerById";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./ServerHeader";
import client from "@/app/libs/prismadb";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";

interface ChannelsSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.OWNER]: "👑",
  // ADMIN: "🛡️",
  [MemberRole.MODERATOR]: "🛡️",
  [MemberRole.GUEST]: "👤",
  // BANNED: "🚫",
  // KICKED: "🚫",
};

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
    <div className="hidden md:flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
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

              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  icon: roleIconMap[member.role],
                  name: member.user.nickname,
                  id: member.user.id,
                })),
              },
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
