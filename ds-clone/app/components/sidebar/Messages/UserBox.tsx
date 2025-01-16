"use client";

import { FC, useEffect, useState } from "react";
import UserAvatar from "../../UserAvatar";
import { cn } from "@/lib/utils";
import getAuthUser from "@/actions/getAuthUser";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { Conversation, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useSocket } from "@/components/providers/socket-provider";
import { useConversationListSocket } from "@/hooks/use-conversation-list-socket";
import { Separator } from "@/components/ui/separator";

interface UserBoxProps {
  src: string;
  name: string;
  id: string;
  conversationsIds: string[];
  loggedInUser: User;
}

const fetchConversationTogether = async (otherUserId: string) => {
  try {
    const result = await axios.get(`/api/conversation/together/${otherUserId}`);
    console.log("[FETCH_CONVERSATION_TOGETHER]", result.data);
    return result.data;
  } catch (error) {
    console.error("[FETCH_CONVERSATION_TOGETHER]", error);
  }
};

const UserBox: FC<UserBoxProps> = ({ src, name, id, conversationsIds, loggedInUser }) => {
  const [conversationTogether, setConversationTogether] = useState<string | null>(null);
  const { joinConversation } = useConversationListSocket({
    queryKey: "conversations",
    updateKey: "chat:conversation-list:update",
    loggedInUser,
  });
  
  const router = useRouter();
  const { socket } = useSocket();
  //
  const fetchConversation = async () => {
    if (!conversationsIds || conversationsIds === undefined) return;
    // find out if the conversationIds can be found in the loggedInUser.conversationIds
    const conversation = await fetchConversationTogether(id);
    console.log("[CONVERSATION_TOGETHER]", conversation);

    setConversationTogether(conversation?.conversationId);
  
    return conversation?.conversationId;
  };

  // useEffect(() => {
  //   fetchConversation();
  // }, [loggedInUser, conversationsIds]);

  const handleOpenConversation = async () => {
    const conversationId = await fetchConversation();
    if (!conversationId) {
      try {
        const { data } = await axios.post("/api/conversation", { userId: id });
        // emit to the server that a new conversation has been created
        data.conversation.userIds.forEach((userId: string) => {
          socket?.emit("join-conversation", { conversationId: data.conversation.id, userId });
        });
        console.log("[NEW_CONVERSATION]", data.conversation.id);

        socket?.emit("new-conversation", { conversationId: data.conversation.id, userId: id });
        router.push(`/messages/${data.conversation.id}`);
      } catch (error) {
        console.log("[ERROR_CREATE_CONVERSATION]", error);
      }
    } else {
      joinConversation(conversationId);
      router.push(`/messages/${conversationId}`);
    }
  };
  return (
    <button
      onClick={handleOpenConversation}
      className="w-full">
      <div className={cn("flex items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700/30")}>
        <UserAvatar
          src={src}
          alt={name}
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-white">{name}</p>
        </div>
      </div>
      <Separator className="border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:bg-opacity-50 dark:border-opacity-50 my-2 mx-auto" />
    </button>
  );
};

export default UserBox;
