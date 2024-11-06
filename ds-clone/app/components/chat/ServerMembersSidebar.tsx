"use client";

import axios from "axios";
import { Loader2, UserRound, UsersRound } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMemberSidebar } from "@/hooks/use-member-sidebar";
import { MembersWithUsers } from "@/types";
import Image from "next/image";
import { MemberRole } from "@prisma/client";
import { roleIconMap } from "@/lib/roleIconMap";



const ServerMembersSidebar = () => {
  const prevServerIdRef = useRef<string | undefined>();

  const { serverId, channelId } = useParams() as { serverId: string; channelId: string };
  const [members, setMembers] = useState([]);
  const { open } = useMemberSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const fetchServerMembers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/server/members/${serverId}/`);
      setMembers(res.data.members);
    } catch (error) {
      console.log("[SERVER_MEMBERS_SIDEBAR] error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Compare current serverId with the previous one
    if (prevServerIdRef.current !== serverId) {
      console.log("[IS OPEN]", serverId);
      fetchServerMembers();

      // Update ref to the current serverId for the next render
      prevServerIdRef.current = serverId;
    }
  }, [serverId]);

  return (
    // <Sidebar
    //   className="flex flex-col h-full"
    //   side="right"
    //   collapsible="offcanvas"
    //   variant="sidebar">
    //   <SidebarHeader />
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <div className="flex items-center justify-between p-4">
    //         <h3 className="text-lg font-semibold">Server Members</h3>
    //         <UsersRound size={24} />
    //         {members.length > 0 && (
    //           <div className="flex items-center space-x-2">
    //             <span className="text-xs font-semibold">{members.length}</span>
    //             <span className="text-xs text-gray-500">Online</span>
    //           </div>
    //         )}
    //       </div>
    //     </SidebarGroup>
    //     <SidebarGroup />
    //     <SidebarGroup />
    //   </SidebarContent>
    //   <SidebarFooter />
    // </Sidebar>
    <div
      className={cn("hidden w-60 bg-white dark:bg-[#2a2c30] border-l flex-col h-full overflow-y-auto transition-all duration-300 ease-in-out z-50", {
        flex: open,
        hidden: !open,
      })}>
      {isLoading ? (
        <div
          className="
          flex flex-col flex-1 justify-center items-center
        ">
          <Loader2 className="h-7 w-7 text-zinc-500 animate-spin" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading members...</p>
        </div>
      ) : (
        <div className="">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-lg font-semibold">Server Members</h3>
            <UsersRound size={24} />
            {members.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold">{members.length}</span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {members.map((member: MembersWithUsers) => (
              <div
                key={member?.id}
                className="flex items-center gap-2 p-4
                  hover:bg-zinc-100 dark:hover:bg-zinc-700
                  transition
                  duration-300
                  ease-in-out
                  cursor-pointer
                  rounded-lg
                ">
                <p
                  className="
                      flex
                      text-gray-500
                      dark:text-gray-400
                      text-sm
                      font-semibold
                      uppercase
                      gap-2
                    ">
                  {roleIconMap[member.role]}
                  <span className="flex gap-2">
                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        w-6
                        h-6
                        bg-zinc-200
                        dark:bg-zinc-700
                        rounded-full
                        overflow-hidden
                        p-1
                    ">
                      {member.user.image ? (
                        <Image
                          src={member.user.image}
                          alt={member.user.nickname}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <UserRound size={24} />
                      )}
                    </span>
                    <span>{member.user.nickname}</span>
                  </span>
                </p>
              </div>
              // map over members with the specific role
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerMembersSidebar;
