"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { UsersRound } from "lucide-react";
import ActionTooltip from "../ActionTooltip";

const ServerMembersButton = () => {
  // const { open, state, setOpen, toggleSidebar } = useSidebar();
  return (
    <ActionTooltip
      label="Server Members"
      side="left">
      <Button
        className="p-2 rounded-full h-7 w-7"
        // variant={open ? "secondary" : "outline"}
        // onClick={toggleSidebar}
        >
        <UsersRound className="h-5 w-5" />
      </Button>
    </ActionTooltip>
  );
};

export default ServerMembersButton;
