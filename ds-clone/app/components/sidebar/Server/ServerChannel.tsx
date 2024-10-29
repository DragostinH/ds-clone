"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash2Icon, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
import ActionTooltip from "../../ActionTooltip";
import { ModalType, useModal } from "@/app/hooks/useModalStore";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: FC<ServerChannelProps> = ({ channel, server, role }) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { server, channel });
  };

  const Icon = iconMap[channel.type];
  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}>
      <Icon className="flex-shrink-0 w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}>
        {channel.name}
      </p>

      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip
            label="Edit"
            side="top">
            <Edit
              onClick={(e) => onAction(e, "edit-channel")}
              className="hidden group-hover:block w-[14px] h-[14px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Remove">
            <Trash2Icon
              onClick={(e) => onAction(e, "delete-channel")}
              className="hidden group-hover:block w-[14px] h-[14px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}

      {channel.name === "general" && <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
    </button>
  );
};

export default ServerChannel;
