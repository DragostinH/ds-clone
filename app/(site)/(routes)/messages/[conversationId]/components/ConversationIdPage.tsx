"use client";

import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import DirectChatMessages from "@/app/components/chat/DirectChatMessages";
import { useSocket } from "@/components/providers/socket-provider";
import { ConversationWithMessagesWithUsers } from "@/types";
import { Conversation, User } from "@prisma/client";
import { useParams, usePathname } from "next/navigation";
import { FC, useEffect } from "react";

interface ConversationIdPageProps {
  conversation: ConversationWithMessagesWithUsers;
  otherUser: User;
  authUser: User;
  directChatMessagesApiUrl: string;
  chatInputApiUrl: string;
  socketUrl: string;
}

const ConversationIdPage: FC<ConversationIdPageProps> = ({ conversation, otherUser, authUser, directChatMessagesApiUrl, chatInputApiUrl, socketUrl }) => {
  // if we leave the page and there are no messages AND no users are connected through the socket, we should remove the conversation and then re-direct the user to where they are supposed to go
  const pathName = usePathname();
  const params = useParams();
  const { socket } = useSocket();

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#313338]">
      {" "}
      <ChatHeader
        conversation={conversation}
        type="conversation"
      />
      <div className="chat_content flex flex-row flex-auto min-h-0 min-w-0 justify-stretch items-stretch">
        <main className="relative flex flex-col min-h-0 min-w-0 flex-auto">
          <DirectChatMessages
            currentUser={authUser}
            otherUser={otherUser!}
            conversation={conversation}
            conversationId={conversation.id}
            apiUrl={directChatMessagesApiUrl}
            socketUrl={socketUrl}
            socketQuery={{ conversationId: conversation.id }}
            paramKey="conversationId"
            paramValue={conversation.id}
            type="conversation"
          />
          <ChatInput
            name={`${otherUser.nickname}`}
            type="conversation"
            apiUrl={chatInputApiUrl}
            query={{ conversationId: conversation.id }}
          />
        </main>
      </div>
    </div>
  );
};

export default ConversationIdPage;
