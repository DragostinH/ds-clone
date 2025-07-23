import getAuthUser from "@/actions/getAuthUser";
import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import ChatMessages from "@/app/components/chat/ChatMessages";
import ServerMembersSidebar from "@/app/components/chat/ServerMembersSidebar";
import SocketIndicator from "@/app/components/SocketIndicator";
import client from "@/app/libs/prismadb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelIdPage = async (props: ChannelIdPageProps) => {
  const params = await props.params;
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/login");

  const channel = await client?.channel.findUnique({
    where: {
      id: params.channelId,
    },
    include: {
      server: {
        include: {
          members: true,
        },
      },
    },
  });

  const member = await client?.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: authUser.id,
    },
  });

  if (!channel || !member) return redirect(`/messages`);
  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#313338]">
      {/* <SocketIndicator /> */}
      <ChatHeader
        channel={channel}
        serverId={channel.server.id}
      />
      <div className="chat_content flex flex-row flex-auto min-h-0 min-w-0 justify-stretch items-stretch">
        <main className="relative flex flex-col min-h-0 min-w-0 flex-auto">
          <ChatMessages
            member={member}
            name={channel?.name}
            chatId={channel.id}
            type="channel"
            apiUrl={`/api/channel/${channel.id}/messages`}
            socketUrl="/api/socket/channel/messages"
            socketQuery={{ serverId: channel.serverId, channelId: channel.serverId }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl={`/api/socket/channel/messages`}
            query={{ serverId: params.serverId, channelId: params.channelId }}
          />
        </main>
        <ServerMembersSidebar />
      </div>
    </div>
  );
};

export default ChannelIdPage;
