import { ScrollArea } from "@/components/ui/scroll-area";
import MessagesHeader from "./MessagesHeader";
import UserSearch from "./UserSearch";
import UserList from "./UserList";
import { Separator } from "@/components/ui/separator";
import getAuthUser from "@/actions/getAuthUser";
import { redirect } from "next/navigation";
import client from "@/app/libs/prismadb";
import UserAvatar from "../../UserAvatar";
import getConversations from "@/actions/getConversations";
import ConversationList from "./ConversationList";
import getUsers from "@/actions/getUsers";

const USERS_BATCH = 10;

const UsersSidebar = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");

  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <div className="flex flex-col z-40 h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      {/* <MessagesHeader /> */}
      <ScrollArea className="flex-1 px-2 gap-4">
        {/* Search */}
        <div className="">
          <UserSearch
            data={[
              {
                label: "Friends",
                data: users?.map((user) => ({
                  avatar: (
                    <UserAvatar
                      src={user?.image ?? ""}
                      alt={user.nickname}
                    />
                  ),
                  name: user.nickname,
                  id: user.id,
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {/* Users */}
        <div className="">
          <ConversationList initialItems={conversations} />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        <div className="">
          <UserList users={users ?? []} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default UsersSidebar;
