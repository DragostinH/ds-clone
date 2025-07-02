import qs from "query-string";
import { useSocket } from "@/components/providers/socket-provider";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface usersListQueryProps {
  queryKey: string;
  apiUrl: string;
}

export const useUsersListQuery = () => {
  const { isConnected } = useSocket();
  const fetchUsers = async ({ pageParam = undefined }) => {
    try {
      const url = qs.stringifyUrl(
        {
          url: "/api/users",
          query: {
            cursor: pageParam,
          },
        },
        { skipNull: true }
      );
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      console.log("[ERROR_FETCH_USERS]", error);
      throw new Error(error);
    }
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: undefined,
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
