"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import UserAvatar from "../../UserAvatar";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import ActionTooltip from "../../ActionTooltip";
import { Settings2Icon } from "lucide-react";
import { useModal } from "@/app/hooks/useModalStore";
import { UserTypeForLogin } from "@/types";

const LoggedUserBox = () => {
  const { onOpen } = useModal();
  const { data, status } = useSession();
  const [loggedUser, setLoggedUser] = useState<UserTypeForLogin>();

  useEffect(() => {
    const fetchLoggedUser = async (id: string) => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setLoggedUser(response.data);
      } catch (error) {
        console.log("ISSUE_FETCHING_LOGGED_USER", error);
        console.log(error);
      }
    };
    if (status === "authenticated") {
      const { id } = data.user;
      fetchLoggedUser(id);
    }
  }, [status]);

  if (status === "loading")
    return (
      <div className="">
        <p>Loading...</p>
      </div>
    );

  if (status === "unauthenticated")
    return (
      <div className="">
        <p>Unauthenticated</p>
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group p-1   flex items-center hover:bg-zinc-700/30">
          <UserAvatar
            src={loggedUser?.image ?? ""}
            alt={loggedUser?.nickname ?? ""}
          />

          <div className="ml-2">
            <p className="text-sm font-medium text-white group-hover:text-white">{loggedUser?.nickname}</p>
            <p className="text-xs text-gray-400 group-hover:text-white">{loggedUser?.email}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-1">
        <DropdownMenuItem
          className="flex items-center text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer
          hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50
        ">
          <ActionTooltip label="View Account">
            <button
              onClick={() => onOpen("view-account", { loggedUser: loggedUser })}
              className="flex w-full justify-between items-center gap-1 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
              View Account
              <Settings2Icon
                width={16}
                height={16}
              />
            </button>
          </ActionTooltip>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoggedUserBox;
