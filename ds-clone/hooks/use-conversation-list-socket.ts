import { useSocket } from "@/components/providers/socket-provider";
import { ConversationWithMessages } from "@/types";
import { Conversation } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ConversationListSocketProps = {
  addKey: string;
  queryKey: string;
  updateKey: string;
};

export const useConversationListSocket = ({ addKey, queryKey, updateKey }: ConversationListSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  if (!socket) return;

  useEffect(() => {
    socket.on(updateKey, (conversation: ConversationWithMessages) => {
      queryClient.setQueryData<ConversationWithMessages[]>([queryKey], (oldData: any) => {
        if (!oldData || !oldData?.pages || oldData.pages.length === 0) return oldData;

        const newData = oldData.pages.map((page: any) => {
          return {};
        });
      });
    });
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
