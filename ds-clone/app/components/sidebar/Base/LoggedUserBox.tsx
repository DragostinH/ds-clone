"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import UserAvatar from "../../UserAvatar";

const LoggedUserBox = () => {
  const { data, status } = useSession();
  console.log("loggedUser", data?.user);

  if (status === "loading")
    return (
      <div className="">
        <p>Loading...</p>
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center hover:bg-zinc-700/30">
          {/* <UserAvatar
            src={loggedUser.user.image ?? ""}
            alt={loggedUser.user.nickname}
          /> */}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoggedUserBox;
