import { ConversationWithUsersWithMessagesWithSender } from "@/types";
import { User } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import { useParams } from "next/navigation";

interface GroupConversationItemProps {
  conversation: ConversationWithUsersWithMessagesWithSender;
  loggedInUser: User;
}

const GroupConversationItem: FC<GroupConversationItemProps> = ({ conversation, loggedInUser }) => {
  const { conversationId } = useParams() as { conversationId: string };
  const sender = conversation?.messages[0]?.sender;
  const otherUser = conversation.users.find((user) => user.id !== loggedInUser.id);
  const message = conversation?.messages[0];
  return (
    <Link
      href={`/messages/${conversation.id}`}
      key={conversation.id}
      className="flex items-center gap-4 p-4 hover:bg-black/5 transition cursor-pointer">
      <div className="flex items-center gap-2">
        <UserAvatar
          src={conversation.users[0].image ?? undefined}
          alt={conversation.users[0].nickname}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-sm">Group Chat</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{message?.body}</p>
        </div>
      </div>
    </Link>
  );
};

export default GroupConversationItem;
