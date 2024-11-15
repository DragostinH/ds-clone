import getAuthUser from "@/actions/getAuthUser";
import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import ChatMessages from "@/app/components/chat/ChatMessages";
import client from "@/app/libs/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";

interface PrivateMessageProps {
  params: {
    userId: string;
  };
}

const PrivateMessage: FC<PrivateMessageProps> = async ({ params: { userId } }) => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/login");

  // check if userId is a hex with 12 bytes
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) return redirect("/messages");

  console.log("[USER_ID]", userId);

  let conversation = await client?.conversation.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [authUser.id, userId],
          },
        },
      },
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      users: true,
    },
  });

  if (!conversation) {
    conversation = await client?.conversation.create({
      data: {
        users: {
          connect: [{ id: authUser.id }, { id: userId }],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        users: true,
      },
    });
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        conversation={conversation}
        type="conversation"
      />
      <div className="chat_content flex flex-row flex-auto min-h-0 min-w-0 justify-stretch items-stretch">
        <main className="relative flex flex-col min-h-0 min-w-0 flex-auto">
          {/* <ChatMessages
            member={member}
            name={channel?.name}
            chatId={channel.id}
            type="channel"
            apiUrl={`/api/conversation/${userId}`}
            socketUrl="/api/socket/channel/messages"
            socketQuery={{ conversationId: conversation.id }}
            paramKey="channelId"
            paramValue={conversation.id}
          /> */}
          <ChatInput
            name={`${conversation.users[1].nickname}`}
            type="conversation"
            apiUrl={`/api/socket/messages`}
            query={{ conversationId: conversation.id }}
          />
        </main>
      </div>
    </div>
  );
};

export default PrivateMessage;
