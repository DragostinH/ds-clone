"use client";

import { ChannelMessage, Member, Message } from "@prisma/client";
import ChatWelcome from "./ChatWelcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Fragment } from "react";
import ChatItem from "./ChatItem";
import { format } from "date-fns";
import { ChannelMessageWithMemberWithUser, ChannelMessageWithUser } from "@/types";
import { useChatSocket } from "@/hooks/use-chat-socket";

const DATE_FORMAT = "d MMM yyyy, HH:mm:ss";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages = ({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:channel:${chatId}:messages`;
  const updateKey = `chat:${chatId}:channel:messages:update`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  useChatSocket({ queryKey, addKey, updateKey });

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
        name={name}
      />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: ChannelMessageWithMemberWithUser) => (
              <ChatItem
                key={message.id}
                message={message}
                id={message.id}
                body={message?.body || ""}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                fileUrl={message?.fileUrl || ""}
                currentMember={member}
                member={message.member}
                deleted={message.deleted}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
