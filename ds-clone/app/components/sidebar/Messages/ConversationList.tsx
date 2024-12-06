"use client";

import { ConversationWithMessages, ConversationWithMessagesWithSender, ConversationWithMessagesWithUsers } from "@/types";
import { Conversation, User } from "@prisma/client";
import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { useConversationListSocket } from "@/hooks/use-conversation-list-socket";
import { useConversationQuery } from "@/hooks/use-conversations-query";
import SingleUserConversationItem from "./SingleUserConversationItem";

interface ConversationListProps {
  conversations: ConversationWithMessagesWithUsers[];
  loggedInUser: User;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "conversationId";
  paramValue: string;
}

const ConversationList: FC<ConversationListProps> = ({ conversations, loggedInUser, apiUrl, socketUrl, socketQuery, paramKey, paramValue }) => {
  const messageKey = `conversations:${loggedInUser.id}:list`;
  const queryKey = `conversations:${loggedInUser.id}`;
  const updateKey = "chat:conversation-list:update";

  // going to turn this component to a real-time component so that it updates the conversation list in real-time
  /*
  What needs to happeen when a new message is sent to the currently logged user:
  - the conversation list updates
    -if a conversation already exists between the users(can be a group chat or a direct chat), the conversation list updates by showing the latest message from the sender and the sender's name. Also the conversation list should be sorted by the latest message sent

    -if a conversation does not exist between the users, a new conversation is created and the conversation list updates by showing the latest message from the sender and the sender's name. Also the conversation list should be sorted by the latest message sent

  - the conversation list should be sorted by the latest message sent

  user sends message to another user->
  **/
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useConversationQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue: loggedInUser.id,
  });

  if (status === "pending")
    return (
      <div className="flex-1">
        <div className="">Loading...</div>
      </div>
    );

  if (status === "error")
    return (
      <div className="flex-1">
        <div>Error...</div>
      </div>
    );
  // useConversationListSocket({ queryKey, addKey, updateKey });
  return (
    <div className="flex flex-col gap-2">
      {/* {conversations.map((conversation) => {
        if (conversation.users.length === 2) {
          const otherUser = conversation.users.find((user) => user?.id !== loggedInUser?.id);
          const sortedMessages = conversation.messages.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
          return (
            <div
              key={conversation.id}
              className="">
              <Link
                href={`/messages/${conversation.id}`}
                key={conversation.id}
                className="flex items-center gap-4 p-4 hover:bg-black/5 transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <UserAvatar
                    src={otherUser?.image ?? undefined}
                    alt={otherUser?.nickname}
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{otherUser?.nickname}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {conversation.messages[0]?.senderId === loggedInUser.id ? "You" : otherUser?.nickname}: {conversation.messages[0]?.body}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        } else if (conversation.users.length > 2) {
          const otherUsers = conversation.users.filter((user) => user.id !== loggedInUser.id);
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
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{conversation.messages[0]?.body}</p>
                </div>
              </div>
            </Link>
          );
        }
        return null;
      })} */}

      {data?.pages[0].items.map((conversation: ConversationWithMessagesWithSender) => {
        if (conversation.userIds.length === 2) {
          const sender = conversation?.messages[0]?.sender;
          const message = conversation?.messages[0];
          return (
            <SingleUserConversationItem
              key={conversation.id}
              conversation={conversation}
              loggedInUser={loggedInUser}
            />
          );
        }
      })}
    </div>
  );
};

export default ConversationList;
