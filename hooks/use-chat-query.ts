import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

import axios from "axios";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ChatQueryProps) => {
  const { isConnected } = useSocket();
  
  const fetchChannelMessages = async ({ pageParam = undefined }) => {
    try {
      const url = qs.stringifyUrl(
        {
          url: apiUrl,
          query: {
            cursor: pageParam,
            [paramKey]: paramValue,
          },
        },
        { skipNull: true }
      );

      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      console.log("[ERROR_FETCH_CHANNEL_MESSAGES]", error);
      throw new Error(error);
    }
  };

  const fetchConversationMessages = async ({ pageParam = undefined }) => {
    try {
      const url = qs.stringifyUrl(
        {
          url: apiUrl,
          query: {
            cursor: pageParam,
            [paramKey]: paramValue,
          },
        },
        { skipNull: true }
      );
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      console.log("[ERROR_FETCH_CONVERSATION_MESSAGES]", error);
      throw new Error(error);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: paramKey === "channelId" ? fetchChannelMessages : fetchConversationMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: undefined,
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
