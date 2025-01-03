"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { useSession } from "next-auth/react";
import { useUsersListQuery } from "@/hooks/use-users-list-query";
import { useUserListSocket } from "@/hooks/use-user-list-socket";
import { UIEvent, useEffect, useRef } from "react";

// interface UserListProps {
//   users: UserWithConversations[];
// }

const UserList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full overflow-y-auto"
      onScroll={handleScroll}>
      {data?.pages.map((page) =>
        page.items.map((user: User) => (
          <UserBox
            key={user.id}
            src={user.image ?? ""}
            name={user.nickname}
            id={user.id}
            conversationsIds={user?.conversationIds}
            loggedInUser={session?.user as User}
          />
        ))
      )}
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default UserList;
