"use client";

import axios from "axios";
import { UsersRound } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from "@/components/ui/sidebar";

const ServerMembersSidebar = () => {
  const { serverId, channelId } = useParams() as { serverId: string; channelId: string };
  const { open } = useSidebar();
  const [members, setMembers] = useState([]);

  const fetchServerMembers = async () => {
    try {
      const res = await axios.get(`/api/server/members/${serverId}/`);
      setMembers(res.data.members);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchServerMembers();
  }, [serverId, channelId, open]);

  return (
    <Sidebar
      className=""
      side="right"
      collapsible="offcanvas"
      variant="sidebar">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
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
        </SidebarGroup>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default ServerMembersSidebar;
