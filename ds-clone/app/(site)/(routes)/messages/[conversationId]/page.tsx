import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC } from "react";
import ConversationIdPage from "./components/ConversationIdPage";

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
    <ConversationIdPage
      conversation={conversation}
      authUser={authUser}
      otherUser={otherUser}
      directChatMessagesApiUrl={directChatMessagesApiUrl}
      chatInputApiUrl={chatInputApiUrl}
      socketUrl={socketUrl}
    />
  );
};

export default PrivateMessage;
