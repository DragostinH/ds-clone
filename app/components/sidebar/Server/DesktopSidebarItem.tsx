"use client";
import React from "react";
import ActionTooltip from "../../ActionTooltip";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SelectedItemIndicator from "./SelectedItemIndicator";

interface DesktopSidebarItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const DesktopSidebarItem = ({ id, name, imageUrl }: DesktopSidebarItemProps) => {
  const { serverId } = useParams() as { serverId: string };
  const imageStyle = {
    animation: ""
  }
  const router = useRouter();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip
      side="right"
      align="center"
      label={name}>
      <button
        className="group relative flex items-center mb-2"
        onClick={onClick}>
        {/* SelectedItemIndicator */}
        <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-1", serverId !== id && "group-hover:h-5", serverId === id ? "h-9" : "h-2")} />
        <div className={cn("relative group flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden", serverId === id && "bg-primary/10 text-primary rounded-2xl")}>
          <Image
            src={imageUrl}
            alt={`${name} server icon`}
            width={48}
            height={48}
            unoptimized
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
