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

    // const handleNewMessage = (channelMessage: ChannelMessageWithMemberWithUser) => {
    //   console.log("addKey received:", channelMessage);

    //   queryClient.setQueryData([queryKey], (oldData: any) => {
    //     // If oldData or oldData.pages is missing, initialize it
    //     if (!oldData || !oldData.pages) {
    //       return {
    //         pages: [
    //           {
    //             items: [channelMessage],
    //           },
    //         ],
    //       };
    //     }

    //     // Ensure that newData[0].items is an array
    //     const newData = [...oldData.pages];
    //     newData[0] = {
    //       ...newData[0],
    //       items: [channelMessage, ...(newData[0].items || [])],
    //     };

    //     return {
    //       ...oldData,
    //       pages: newData,
    //     };
    //   });
    // };

    socket.on("hello", (channelMessage: ChannelMessageWithMemberWithUser) => {
      // lets get testing with listening to emit("hello", message) from the server
      console.log("addKey received:", channelMessage);
      
    });

    return () => {
      socket.off(addKey, "off");
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
