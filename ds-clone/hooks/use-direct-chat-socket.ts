import { useSocket } from "@/components/providers/socket-provider";
import { MessageWithConversationWithSender, MessageWithSender } from "@/types";
import { Conversation } from "@prisma/client";
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
      console.log("[ADDING_NEW_MESSAGE]", directMessage);

      queryClient.setQueryData<MessageWithConversationWithSender[]>([queryKey], (oldData: any) => {
        console.log("[OLD_DATA]", oldData);

        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          console.log("[NO_OLD_DATA]", oldData);

          return {
            pages: [
              {
                items: [directMessage],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        console.log("[NEW_DATA]", newData);

        newData[0] = {
          ...newData[0],
          items: [directMessage, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });

      queryClient.setQueryData<Conversation[]>([queryKey], (conversations: Conversation[] | undefined) => {
        if (!conversations) return [];
        const conversationIndex = conversations.findIndex((conversation) => conversation.id === directMessage.conversationId);

        if (conversationIndex !== -1) {
          const updatedConversation = {
            ...conversations[conversationIndex],
            lastMessageAt: new Date(),
            name: directMessage.sender.nickname,
          };

          return [updatedConversation, ...conversations.filter((_, index) => index !== conversationIndex)];
        }

        return [...conversations];
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, addKey, queryKey, updateKey]);
};

// export const useDirectChatSocket = ({
//   addKey,
//   queryKey,
//   updateKey,
// }: DirectChatSocketProps) => {
//   const { socket } = useSocket();
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (!socket) return;

//     // Trigger when a new message is added
//     socket.on(addKey, (directMessage: MessageWithSender & { conversationId: string }) => {
//       console.log("[ADDING_NEW_MESSAGE]", directMessage);

//       // Update the messages list
//       queryClient.setQueryData<MessageWithConversationWithSender[]>([queryKey], (oldData: any) => {
//         if (!oldData || !oldData.pages || oldData.pages.length === 0) {
//           return {
//             pages: [{ items: [directMessage] }],
//           };
//         }

//         const newData = [...oldData.pages];
//         newData[0] = {
//           ...newData[0],
//           items: [directMessage, ...newData[0].items],
//         };

//         return {
//           ...oldData,
//           pages: newData,
//         };
//       });

//       // Update the conversation list
//       queryClient.setQueryData<Conversation[]>(["conversations"], (conversations: Conversation[] | undefined) => {
//         if (!conversations) return [];

//         const conversationIndex = conversations.findIndex(
//           (conversation) => conversation.id === directMessage.conversationId
//         );

//         if (conversationIndex !== -1) {
//           // Update the existing conversation
//           const updatedConversation = {
//             ...conversations[conversationIndex],
//             lastMessageAt: new Date().toISOString(),
//             name: directMessage.sender.nickname, // Assuming sender.nickname represents the name
//           };

//           // Move the updated conversation to the top
//           return [
//             updatedConversation,
//             ...conversations.filter((_, index) => index !== conversationIndex),
//           ];
//         }

//         // If the conversation doesn't exist, create a new one
//         const newConversation: Conversation = {
//           id: directMessage.conversationId,
//           createdAt: new Date().toISOString(),
//           lastMessageAt: new Date().toISOString(),
//           name: directMessage.sender.nickname,
//           isGroup: false,
//           userIds: [directMessage.sender.id],
//           messages: [directMessage],
//         };

//         return [newConversation, ...conversations];
//       });
//     });

//     // Clean up socket listeners on unmount
//     return () => {
//       socket.off(addKey);
//       socket.off(updateKey);
//     };
//   }, [socket, queryClient, addKey, queryKey, updateKey]);
// };
