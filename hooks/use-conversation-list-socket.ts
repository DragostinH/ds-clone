import { useSocket } from "@/components/providers/socket-provider";
import { ConversationWithMessages, MessageWithSender } from "@/types";
import { Conversation, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

type ConversationListSocketProps = {
  // addKey: string;
  queryKey: string;
  updateKey: string;
  loggedInUser: User;
};

export const useConversationListSocket = ({ queryKey, updateKey, loggedInUser }: ConversationListSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const [joinedConversations, setJoinedConversations] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", async () => {
      try {
        const userConversationIds = await axios.get(`/api/conversation/list/ids`);
        userConversationIds.data.forEach((id: string) => {
          joinConversation(id.id);
        });
      } catch (error) {
        console.error("[CONNECTION_ERROR]", error);
      }
    });

    socket.on(updateKey, ({ userId, updatedConversation }: { userId: String; updatedConversation: Conversation }) => {
      if (userId === loggedInUser.id) {
        queryClient.setQueryData<ConversationWithMessages[]>([queryKey], (oldData: any) => {
          if (!oldData || !oldData?.pages || oldData.pages.length === 0) return oldData;

          let newData;
          // find if oldData.pages has the conversation
          // if conversation doesn't exist just push it to the list
          if (!oldData.pages[0].items.some((item: Conversation) => item.id === updatedConversation.id)) {
            console.log("[CONVERSATION_NOT_FOUND_PUSHING]", updatedConversation);
            newData = oldData.pages.map((page: any) => {
              return {
                ...page,
                items: [updatedConversation, ...page.items],
              };
            });

            //connect the other user to the conversation
            joinConversation(
              updatedConversation.id,
              updatedConversation.userIds.find((userId: string) => userId !== loggedInUser.id)
            );
          } else {
            console.log("[CONVERSATION_FOUND_UPDATING]", oldData);
            newData = oldData.pages.map((page: any) => {
              return {
                ...page,
                items: page.items.map((item: Conversation) => {
                  if (item.id === updatedConversation.id) {
                    return updatedConversation;
                  }
                  return item;
                }),
              };
            });
          }

          newData = newData.sort((a: Conversation, b: Conversation) => {
            if (!a.lastMessageAt || !b.lastMessageAt) return 0;
            return a.lastMessageAt > b.lastMessageAt ? -1 : 1;
          });

          return {
            ...oldData,
            pages: newData,
          };
        });
      }
    });

    socket.on("user-joined", (data: any) => {
      // console.log("user-joined", data);
    });

    socket.on("message-seen", (message: MessageWithSender) => {
      console.log("[message-seen]", message);
    });

    socket.on("first-message", ({ conversationId, userId }: { conversationId: string; userId: string }) => {
      console.log("[first-message]", conversationId, userId);
      // joinConversation(conversationId, userId);
    });

    return () => {
      socket.off("chat:conversation-list:update");
      socket.off("user-joined");
    };
  }, [queryClient, queryKey, socket, updateKey]);

  const joinConversation = (conversationId: string, userId = loggedInUser.id) => {
    if (socket) {
      socket.emit("join-conversation", { conversationId, userId: userId });
      setJoinedConversations([...joinedConversations, conversationId]);
    }
  };

  return { joinConversation };
};
