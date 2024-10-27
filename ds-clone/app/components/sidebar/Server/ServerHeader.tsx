"use client";

import getServerById from "@/actions/getServerById";
import { useModal } from "@/app/hooks/useModalStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, SettingsIcon, TrashIcon, UserPlus, Users } from "lucide-react";
import React from "react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const { onOpen } = useModal();
  const isOwner = role === MemberRole.OWNER;
  const isModerator = isOwner || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none"
        asChild>
        <button className="w-full text-lg px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}

          <ChevronDown className="w-5 h-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-1">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite-member", { server })}
            className="flex items-center text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer
          hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
          ">
            Invite People
            <UserPlus className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isOwner && (
          <DropdownMenuItem
            onClick={() => onOpen("server-settings", { server })}
            className="rounded-sm flex items-center px-3 py-2 text-sm cursor-pointer 
          hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
          ">
            Server Settings
            <SettingsIcon className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isOwner && (
          <DropdownMenuItem
            onClick={() => onOpen("manage-members", { server })}
            className="rounded-sm flex items-center px-3 py-2 text-sm cursor-pointer 
            hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
          ">
            Manage Members
            <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="rounded-sm flex items-center px-3 py-2 text-sm cursor-pointer 
            hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
          ">
            Create Channel
            <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isOwner && (
          <DropdownMenuItem
            className="rounded-sm text-rose-500 flex items-center px-3 py-2 text-sm cursor-pointer 
            hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
          ">
            Delete Server
            <TrashIcon className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isOwner && (
          <DropdownMenuItem
            className="rounded-sm text-rose-500 flex items-center px-3 py-2 text-sm cursor-pointer 
            hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
          ">
            Logout
            <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
