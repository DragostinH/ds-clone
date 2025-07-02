import { useSocket } from "@/components/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


export const useUserListSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    console.log("[USER_LIST_SOCKET]");

    socket.on("new-conversation"),
      ({ conversationId, userId }: { conversationId: String; userId: String }) => {
        console.log("[need to update the user list's conversationids]", conversationId, userId);
      };

    return () => {
      socket.off("new-conversation");
    };
  }, [socket, queryClient]);
};
