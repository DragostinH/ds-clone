import { useSocket } from "@/components/providers/socket-provider";
import { MessageWithConversationWithSender, MessageWithSender } from "@/types";
import { Conversation, Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type DirectChatSocketProps = {
  addKey: string;
  queryKey: string;
  updateKey: string;
};

export const useDirectChatSocket = ({ addKey, queryKey, updateKey }: DirectChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    // whenever you update a message, you use this socket event:
    socket.on(updateKey, (directMessage: MessageWithSender) => {});

    // whenever you add a message, you use this socket event:
    socket.on(addKey, (directMessage: MessageWithSender) => {
      queryClient.setQueryData<MessageWithConversationWithSender[]>([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [directMessage],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [directMessage, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });

      // queryClient.setQueryData<Conversation[]>([queryKey], (conversations: Conversation[] | undefined) => {
      //   if (!conversations) return [];
      //   const conversationIndex = conversations.findIndex((conversation) => conversation.id === directMessage.conversationId);

      //   if (conversationIndex !== -1) {
      //     const updatedConversation = {
      //       ...conversations[conversationIndex],
      //       lastMessageAt: new Date(),
      //       name: directMessage.sender.nickname,
      //     };

      //     return [updatedConversation, ...conversations.filter((_, index) => index !== conversationIndex)];
      //   }

      //   return [...conversations];
      // });
    });

    socket.on("message-seen", (message: MessageWithSender) => {
      console.log("message-seen", message);
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, addKey, queryKey, updateKey]);
};