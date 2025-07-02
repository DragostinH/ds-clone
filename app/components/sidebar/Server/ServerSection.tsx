"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { FC } from "react";
import ActionTooltip from "../../ActionTooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/app/hooks/useModalStore";

interface ServerSectionProps {
  label?: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection: FC<ServerSectionProps> = ({ label, role, sectionType, channelType, server }) => {
  const { onOpen, data } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="pointer-events-none text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>

      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel">
          <button
            onClick={() => onOpen("create-channel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Plus
              width={16}
              height={16}
            />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.OWNER && sectionType === "members" && (
        <ActionTooltip label="Invite Member">
          <button
            onClick={() => onOpen("invite-member", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Settings
              width={16}
              height={16}
            />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
