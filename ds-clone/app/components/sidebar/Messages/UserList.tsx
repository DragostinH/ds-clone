"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { useSession } from "next-auth/react";
import { useUsersListQuery } from "@/hooks/use-users-list-query";
import { useUserListSocket } from "@/hooks/use-user-list-socket";
import { UIEvent, useEffect, useRef, useState } from "react";
import UserSearchBar from "./UserSearchBar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// interface UserListProps {
//   users: UserWithConversations[];
// }

const UserList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: session, status } = useSession();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status: queryStatus } = useUsersListQuery();

  useUserListSocket();

  // infinite scroll
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // getting the user list depending on how big the screen is. If you can't see a scrollbar, it will fetch the next page
  useEffect(() => {
    const checkAndFetch = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight <= clientHeight && hasNextPage && isFetchingNextPage !== undefined) {
          fetchNextPage();
        }
      }
    };

    checkAndFetch();
  }, [hasNextPage]);

  if (status === "unauthenticated") return <div>{status}</div>;
  if (queryStatus === "pending") return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (queryStatus === "error") return <div className="flex-1 flex items-center justify-center">Error...</div>;
  if (data?.pages[0].items.length === 0) return <div>No other users on the platform 😢</div>;

  const filteredUsers = data?.pages?.flatMap((page) => page.items.filter((user: User) => user.nickname.toLowerCase().includes(searchQuery.toLowerCase())));
  return (
    <div className="flex flex-col h-full">
      <UserSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ScrollArea
        ref={containerRef}
        className="flex flex-col h-full px-6 py-4 pt-2 overflow-y-auto"
        onScroll={handleScroll}>
        {filteredUsers?.map((user: User) => (
          <div
            key={user.id}
            className="">
            <UserBox
              src={user.image ?? ""}
              name={user.nickname}
              id={user.id}
              conversationsIds={user?.conversationIds}
              loggedInUser={session?.user as User}
            />
          </div>
        ))}
        {isFetchingNextPage && <div>Loading more...</div>}
      </ScrollArea>
    </div>
  );
};

export default UserList;
