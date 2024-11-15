import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import { cn } from "@/lib/utils";
import SocketIndicator from "../../SocketIndicator";
import Link from "next/link";

interface UserBoxProps {
  src: string;
  name: string;
  id: string;
}

const UserBox: FC<UserBoxProps> = ({ src, name, id }) => {
  return (
    <Link
      href={`/messages/${id}`}
      className="">
      <div className={cn("flex items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700/30")}>
        <UserAvatar
          src={src}
          alt={name}
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-white">{name}</p>
        </div>
        {/* <SocketIndicator /> */}
      </div>
    </Link>
  );
};

export default UserBox;
