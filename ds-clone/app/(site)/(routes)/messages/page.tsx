import getUsers from "@/actions/getUsers";
import ChatHeader from "@/app/components/chat/ChatHeader";
import UserList from "@/app/components/sidebar/Messages/UserList";

const MessagesPage = async () => {
  const users = await getUsers();

  return (
    <div className="">
      <ChatHeader type="users" />
      <div className="">
        <UserList users={users ?? []} />
      </div>
    </div>
  );
};

export default MessagesPage;
