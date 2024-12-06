import getAuthUser from "@/actions/getAuthUser";
import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import DirectChatMessages from "@/app/components/chat/DirectChatMessages";
import client from "@/app/libs/prismadb";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC } from "react";

interface PrivateMessageProps {
  params: {
    conversationId: string;
  };
}

const PrivateMessage: FC<PrivateMessageProps> = async ({ params: { conversationId } }) => {
  const authUser = await getAuthUser();
  const directChatMessagesApiUrl = `/api/conversation/${conversationId}/messages`;
  const chatInputApiUrl = "/api/socket/messages";
  const socketUrl = "/api/socket/messages";

  if (!authUser) return redirect("/login");

  // check if conversationId is a hex with 12 bytes
  if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) return redirect("/messages");

  const conversation = await client?.conversation.findFirst({
    where: {
      id: conversationId,
    },

    include: {
      users: true,
      messages: true,
    },
  });

  const otherUser = conversation?.users.find((user) => user.id !== authUser.id) as User;

  if (!conversation) return redirect("/messages");

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#313338]">
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
            name={`${conversation.users[1].nickname}`}
            type="conversation"
            apiUrl={chatInputApiUrl}
            query={{ conversationId: conversation.id }}
          />
        </main>
      </div>
    </div>
  );
};

export default PrivateMessage;
