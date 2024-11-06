"use client";

import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import { useMemberSidebar } from "@/hooks/use-member-sidebar";

const ServerMembersButton = () => {
  const { open, setOpen } = useMemberSidebar();
  return (
    <ActionTooltip
      label={open ? "Close Members" : "Open Members"}
      side="left">
      <Button
        className="p-2 rounded-full h-7 w-7"
        variant={open ? "default" : "secondary"}
        onClick={() => {
          setOpen(!open);
        }}>
        <UsersRound className="h-5 w-5" />
      </Button>
    </ActionTooltip>
  );
};

export default ServerMembersButton;
