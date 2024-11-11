import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import { cn } from "@/lib/utils";

interface UserBoxProps {
  src: string;
  name: string;
  id: string;
}

const UserBox: FC<UserBoxProps> = ({ src, name, id }) => {
  return (
    <div className="">
      <div className={cn("flex items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700/30")}>
        <UserAvatar
          src={src}
          alt={name}
        />
      </div>
    </div>
  );
};

export default UserBox;
