import { User } from "@prisma/client";
import { FC } from "react";
import UserBox from "./UserBox";

interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div className="">
      <div className="">
        {users.map((user) => (
          <UserBox
            key={user.id}
            src={user.image ?? ""}
            name={user.nickname}
            id={user.id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
