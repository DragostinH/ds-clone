"use client";

import { ChannelMessage, Member, MemberRole, Message } from "@prisma/client";
import UserAvatar from "../UserAvatar";
import { ChannelMessageWithUser, MembersWithUsers } from "@/types";
import ActionTooltip from "../ActionTooltip";
import { roleIconMap } from "@/lib/roleIconMap";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ChatItemProps {
  message: Message | ChannelMessage;
  id: string;
  body: string;
  timestamp: string;
  fileUrl: string;
  imageUrl?: string;
  currentMember: Member;
  deleted: boolean;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  member: MembersWithUsers;
}

const ChatItem = ({ message, member, id, body, timestamp, fileUrl, imageUrl, currentMember, deleted, isUpdated, socketUrl, socketQuery }: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileType = fileUrl?.split(".").pop();
  const isOwner = currentMember.role === MemberRole.OWNER;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isMember = currentMember.role === MemberRole.GUEST;
  const isOP = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isOwner || isModerator || isOP);
  const canEditMessage = !deleted && isOP && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = !isPdf && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar
            src={member?.user?.image ?? undefined}
            alt={member?.user.nickname}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">{member.user.nickname}</p>
              <ActionTooltip label={member.role}>
                <span className="text-xs text-gray-500 dark:text-gray-400">{roleIconMap[member.role]}</span>
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
          </div>
          {isImage && (
            <Link
              href={fileUrl}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center">
              <Image
                src={fileUrl}
                alt={body}
                fill
                objectFit="cover"
              />
            </Link>
          )}
          {body}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
