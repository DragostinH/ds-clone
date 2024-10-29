// import a letter icon from react-icons
"use client";

import React from "react";
import { BsChatDots } from "react-icons/bs";
import clsx from "clsx";
import Link from "next/link";
import ActionTooltip from "../../ActionTooltip";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MessagesRouteLink = () => {
  const path = usePathname();

  const Icon = BsChatDots;
  return (
    <ActionTooltip
      label="Messages"
      side="right"
      align="center">
      <Link
        href="/messages"
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-3xl transition-all border-primary-300 border-[1px]",
          path.includes("/messages") && "bg-primary-400 text-primary-900 border-primary"
        )}>
        <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-1", path.includes("/messages") && "group-hover:h-5", path.includes("/messages") ? "h-9" : "h-2")} />
        <div>
          <Icon className={clsx({})} />
        </div>
      </Link>
    </ActionTooltip>
  );
};

export default MessagesRouteLink;
