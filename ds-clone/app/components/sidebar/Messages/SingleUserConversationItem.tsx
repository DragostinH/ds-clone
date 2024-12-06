import Link from "next/link";
import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import { User } from "@prisma/client";
import { ConversationWithMessagesWithSender } from "@/types";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SingleUserConversationItemProps {
  conversation: ConversationWithMessagesWithSender;
  loggedInUser: User;
}

const SingleUserConversationItem: FC<SingleUserConversationItemProps> = ({ conversation, loggedInUser }) => {
  const { conversationId } = useParams() as { conversationId: string };
  console.log("[CONVERSATION_ID]", conversationId);

  const sender = conversation?.messages[0]?.sender;
  const message = conversation?.messages[0];
  return (
    <Link
      href={`/messages/${conversation.id}`}
      key={conversation.id}
      className={cn("flex items-center gap-4 p-2 rounded-md hover:bg-black/5 transition cursor-pointer", conversationId === conversation.id && "bg-primary-900/50 hover:bg-primary-600")}>
      <div className="flex items-center gap-2">
        <UserAvatar
          src={sender?.image ?? undefined}
          alt={sender?.nickname}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{sender?.nickname}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {message?.senderId === loggedInUser.id ? "You" : sender?.nickname}: {message?.body}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SingleUserConversationItem;
