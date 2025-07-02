import { Channel, Conversation } from "@prisma/client";
import { Hash, Menu, Users2, UsersRound } from "lucide-react";
import MobileToggle from "../MobileToggle";
import ServerMembersButton from "./ServerMembersButton";
import { ConversationWithMessagesWithUsers } from "@/types";
import SocketIndicator from "../SocketIndicator";

interface ChatHeaderProps {
  channel?: Channel;
  conversation?: ConversationWithMessagesWithUsers;
  serverId?: string;
  type?: "channel" | "conversation" | "users" | "direct-message";
  imageUrl?: string;
}

const ChatHeader = ({ channel, conversation, serverId, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-sm font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <SocketIndicator />

      <MobileToggle serverId={serverId ?? ""} />
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

      {conversation && (
        <div className="flex items-center gap-2">
          <Users2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <span className="">{conversation.users[1].nickname}</span>
        </div>
      )}

      {!channel && !conversation && (
        <div className="flex items-center gap-2">
          <UsersRound className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <span className="">Users you can chat with {channel}</span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
