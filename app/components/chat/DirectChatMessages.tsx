"use client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useDirectChatSocket } from "@/hooks/use-direct-chat-socket";
import ChatWelcome from "./ChatWelcome";
import { Fragment } from "react";
import ChatItem from "./ChatItem";
import { User } from "@prisma/client";
import { ConversationWithMessagesWithUsers, MessageWithSender } from "@/types";
import DirectChatItem from "./DirectChatItem";
import { useSocket } from "@/components/providers/socket-provider";

interface DirectChatMessagesProps {
  currentUser: User;
  otherUser: User;
  conversation: ConversationWithMessagesWithUsers;
  conversationId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "conversationId";
  paramValue: string;
  type: "conversation";
}
const DirectChatMessages = ({ currentUser, otherUser, conversationId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: DirectChatMessagesProps) => {
  const queryKey = `chat:${conversationId}`;
  const addKey = `chat:conversation:${conversationId}:messages`;
  const updateKey = `chat:conversation${conversationId}:messages:update`;
  const { socket } = useSocket();


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useDirectChatSocket({ queryKey, addKey, updateKey });

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

  return (
    <div className="relative flex flex-col py-4 overflow-y-auto flex-1 min-h-0 min-w-0 z-0">
      <div className="flex-1" />
      <ChatWelcome
        type={type}
        name={otherUser.nickname}
        user={otherUser}
      />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithSender) => (
              <DirectChatItem
                currentUser={currentUser}
                key={message.id}
                message={message}
                sender={message.sender}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DirectChatMessages;
