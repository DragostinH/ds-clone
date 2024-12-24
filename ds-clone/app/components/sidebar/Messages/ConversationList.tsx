"use client";

import { ConversationWithMessages, ConversationWithUsersWithMessagesWithSender } from "@/types";
import { Conversation, User } from "@prisma/client";
import { FC, useEffect } from "react";
import UserAvatar from "../../UserAvatar";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { useConversationListSocket } from "@/hooks/use-conversation-list-socket";
import { useConversationQuery } from "@/hooks/use-conversations-query";
import SingleUserConversationItem from "./SingleUserConversationItem";
import GroupConversationItem from "./GroupConversationItem";
import { useSocket } from "@/components/providers/socket-provider";

interface ConversationListProps {
  loggedInUser: User;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "conversationId";
  paramValue: string;
}

const ConversationList: FC<ConversationListProps> = ({ loggedInUser, apiUrl, socketUrl, socketQuery, paramKey, paramValue }) => {
  const { socket } = useSocket();
  const queryKey = `conversations:${loggedInUser.id}`;
  const updateKey = `chat:conversation-list:update:${loggedInUser?.id}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useConversationQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue: loggedInUser.id,
  });

  useConversationListSocket({ queryKey, updateKey, loggedInUser });

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
    <div className="flex flex-col gap-2">
      {data?.pages[0]?.items?.map((conversation: ConversationWithUsersWithMessagesWithSender) => {
        if (conversation.userIds.length === 2) {
          return (
            <SingleUserConversationItem
              key={conversation.id}
              conversation={conversation}
              loggedInUser={loggedInUser}
            />
          );
        } else {
          return (
            <GroupConversationItem
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
