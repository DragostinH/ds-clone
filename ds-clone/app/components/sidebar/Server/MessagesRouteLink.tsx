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
      <div className="group flex items-center">
        <Link
          href="/messages"
          className={cn(
            "flex items-center justify-center w-12 h-12 border-[1px] border-primary-300 rounded-3xl group-hover:rounded-2xl transition-all",
            path?.includes("/messages") && "bg-primary-400 text-primary-900 border-primary rounded-2xl"
          )}>
          <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-1", !path?.includes("/messages") && "group-hover:h-6", path?.includes("/messages") ? "h-6" : "h-2")} />
          <div>
            <Icon
              className={clsx({
                "text-primary-300 group-hover:text-primary-400": !path?.includes("/messages"),
                "text-primary-100": path?.includes("/messages"),
              })}
            />
          </div>
        </Link>
      </div>
    </ActionTooltip>
  );
};

export default MessagesRouteLink;
