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
import getUsers from "@/actions/getUsersWithConversation";
import LoggedUserBox from "../Base/LoggedUserBox";

const USERS_BATCH = 10;

const UsersSidebar = async () => {
  const authUser = await getAuthUser();
  const apiUrl = `/api/conversation/list`;
  const socketUrl = "";
  const socketQuery = {};
  if (!authUser) return redirect("/login");

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
          <ConversationList
            loggedInUser={authUser}
            apiUrl={apiUrl}
            socketUrl={socketUrl}
            socketQuery={socketQuery}
            paramKey="conversationId"
            paramValue=""
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      </ScrollArea>
      <LoggedUserBox />
    </div>
  );
};

export default UsersSidebar;
