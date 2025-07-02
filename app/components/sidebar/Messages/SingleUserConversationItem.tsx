"use client";

import Link from "next/link";
import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import { User } from "@prisma/client";
import { ConversationWithUsersWithMessagesWithSender } from "@/types";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSocket } from "@/components/providers/socket-provider";

interface SingleUserConversationItemProps {
  conversation: ConversationWithUsersWithMessagesWithSender;
  loggedInUser: User;
}

const SingleUserConversationItem: FC<SingleUserConversationItemProps> = ({ conversation, loggedInUser }) => {
  const { socket } = useSocket();
  const { conversationId } = useParams() as { conversationId: string };
  const sender = conversation?.messages[0]?.sender;
  const otherUser = conversation.users.find((user) => user.id !== loggedInUser.id);
  const message = conversation?.messages[0];
  // toggle seen status
  const handleSeen = async () => {
    if (!socket) {
      console.log("Socket not available");
    }

    try {
      await socket.emit("message-seen", { messageId: message.id, userId: loggedInUser.id });

      if (message.seenIds.includes(loggedInUser.id)) return;
      if (!message.seenIds.includes(loggedInUser.id)) {
        // update message seen status
        socket.emit("message-seen", { messageId: message.id, userId: loggedInUser.id });
      }
    } catch (error) {
      console.error("[CONNECTION_ERROR]", error);
    }
  };

  return (
    conversation.messages.length > 0 && (
      <div
        onClick={handleSeen}
        className="">
        <Link
          href={`/messages/${conversation.id}`}
          key={conversation.id}
          className={cn("flex items-center gap-4 p-2 rounded-md hover:bg-black/50 transition cursor-pointer", conversationId === conversation.id && "bg-primary-900/50 hover:bg-primary-600")}>
          <div className="flex items-center gap-2">
            <UserAvatar
              src={otherUser?.image ?? undefined}
              alt={otherUser?.nickname}
            />
            <div className="flex flex-col">
              <p className="font-semibold text-sm">{otherUser?.nickname}</p>
              <p className={cn("text-xs text-zinc-500 dark:text-zinc-400", message?.seenIds.includes(loggedInUser.id) ? "font-normal" : "dark:text-white font-extrabold")}>
                {message?.senderId === loggedInUser.id ? "You" : sender?.nickname}: {message?.body}
              </p>
            </div>
          </div>
        </Link>
      </div>
    )
  );
};

export default SingleUserConversationItem;
