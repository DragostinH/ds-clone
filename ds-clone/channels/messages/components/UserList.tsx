import { User } from "@prisma/client";
import React from "react";
import UserItem from "./UserItem";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside
      className="
	  inset-y-0
	  pb-20
	  lg:pb-0
	  lg:left-20
	  lg:w-80
	  lg:block
	  overflow-y-auto
	  border-r
	  border-gray-200
	  block
	  w-full
	  left-0
	  ">
      <div className="flex-col">
        <div
          className="text-2xl
			font-bold
			text-neutral-800
			py-4">
          Users
        </div>
      </div>
      {users.map((user: User) => {
        return (
          <UserItem
            key={user.id}
            user={user}
          />
        );
      })}
    </aside>
  );
};

export default UserList;
