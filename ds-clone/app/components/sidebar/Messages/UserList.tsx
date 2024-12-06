import { User } from "@prisma/client";
import { FC } from "react";
import UserBox from "./UserBox";
import { UserWithConversations } from "@/types";
import getAuthUser from "@/actions/getAuthUser";
import { redirect } from "next/navigation";

interface UserListProps {
  users: UserWithConversations[];
}

const UserList: FC<UserListProps> = async ({ users }) => {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/login");
  return (
    <div className="">
      <div className="flex flex-col">
        {users.map((user) => (
          <UserBox
            key={user.id}
            src={user.image ?? ""}
            name={user.nickname}
            id={user.id}
            conversations={user.conversations}
            loggedInUser={authUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
