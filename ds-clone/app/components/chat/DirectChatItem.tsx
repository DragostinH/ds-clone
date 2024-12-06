"use client";

import { Message, User } from "@prisma/client";
import { useState } from "react";
import UserAvatar from "../UserAvatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DirectChatItemProps {
  message: Message;
  sender: User;
  currentUser: User;
}

const DATE_FORMAT = "d MMM yyyy, HH:mm:ss";

const DirectChatItem = ({ message, sender, currentUser }: DirectChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //TODO change model to accept fileUrl
  // const fileType = message.fileUrl?.split(".").pop();

  const isSender = message.senderId === currentUser.id;
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar
            src={sender.image ?? undefined}
            alt={sender.nickname}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className={cn("font-semibold text-sm hover:underline cursor-pointer", isSender ? "text-primary-900 dark:text-primary-400" : "text-zinc-500 dark:text-zinc-400")}>{sender.nickname}</p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{format(new Date(message.createdAt), DATE_FORMAT)}</span>
          </div>
          {/* 
            TODO:
            - Add image <Link> to message.fileUrl functionality
           */}
          <div className="flex items-center gap-x-2">
            <p className="text-md">{message.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectChatItem;
