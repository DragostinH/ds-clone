import getAuthUser from "@/actions/getAuthUser";
import getUsersWithConversation from "@/actions/getUsersWithConversation";
import ChatHeader from "@/app/components/chat/ChatHeader";
import UserList from "@/app/components/sidebar/Messages/UserList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

const MessagesPage = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");
  return (
    <div className="flex flex-col h-full w-">
      <ChatHeader type="users" />
      <UserList />
    </div>
  );
};

export default MessagesPage;
