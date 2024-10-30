import { Channel, Conversation } from "@prisma/client";
import { Hash, Menu, Users2, UsersRound } from "lucide-react";
import MobileToggle from "../MobileToggle";
import ServerMembersButton from "./ServerMembersButton";

interface ChatHeaderProps {
  channel?: Channel;
  conversation?: Conversation;
  serverId: string;
  type?: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ channel, serverId, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-sm font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {channel && (
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span className="">{channel.name}</span>
          </div>
          <ServerMembersButton />
          {/* <ServerUsersToggle /> */}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
