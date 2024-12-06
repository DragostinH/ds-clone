import { useSocket } from "@/components/providers/socket-provider";
import { ChannelMessageWithMemberWithUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
  addKey: string;
  queryKey: string;
  updateKey: string;
};

export const useChatSocket = ({ addKey, queryKey, updateKey }: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    // whenever you update a message, you use this socket event
    socket.on(updateKey, (channelMessage: ChannelMessageWithMemberWithUser) => {
      // add logic for updating the cache
      queryClient.setQueryData<ChannelMessageWithMemberWithUser[]>([queryKey], (oldData: any) => {
        if (!oldData || !oldData?.pages || oldData.pages.length === 0) return oldData;

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: ChannelMessageWithMemberWithUser) => {
              if (item.id === channelMessage.id) {
                return channelMessage;
              }

              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    // whenever you add a message, you use this socket event
    socket.on(addKey, (channelMessage: ChannelMessageWithMemberWithUser) => {

      queryClient.setQueryData<ChannelMessageWithMemberWithUser[]>([queryKey], (oldData: any) => {

        if (!oldData || !oldData.pages || oldData.pages.length === 0) {

          return {
            pages: [
              {
                items: [channelMessage],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [channelMessage, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
