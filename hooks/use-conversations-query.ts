import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

import axios from "axios";

interface ConversationQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useConversationQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ConversationQueryProps) => {
  const { isConnected } = useSocket();
  const fetchConversations = async ({ pageParam = undefined }) => {
    try {
      const url = qs.stringifyUrl(
        {
          url: apiUrl,
          query: {
            cursor: pageParam,
            // [paramKey]: paramValue,
          },
        },
        { skipNull: true }
      );

      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      console.log("[ERROR_FETCH_CONVERSATIONS]", error);
      throw new Error(error);
    }
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchConversations,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: undefined,
  });
  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
