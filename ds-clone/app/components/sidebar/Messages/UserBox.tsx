"use client";

import { FC } from "react";
import UserAvatar from "../../UserAvatar";
import { cn } from "@/lib/utils";
import getAuthUser from "@/actions/getAuthUser";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { Conversation, User } from "@prisma/client";

interface UserBoxProps {
  src: string;
  name: string;
  id: string;
  conversations: Conversation[];
  loggedInUser: User;
}

const UserBox: FC<UserBoxProps> = ({ src, name, id, conversations, loggedInUser }) => {
  const router = useRouter();
  const handleOnClick = async () => {
    try {
      // find conversation where the clicked user is in and the logged in user is in
      const conversationTogether = loggedInUser.conversationIds.find((conversationId) => {
        return conversations.find((conversation) => {
          return conversation.id === conversationId;
        });
      });

      if (!conversationTogether || conversationTogether === undefined) {
        // create a new conversation with both users
        try {
          const res = await axios.post(`/api/conversation`, {
            userId: id,
          });

          router.push(`/messages/${res.data.conversation.id}`);
        } catch (error) {
          console.error(error);
          console.log("[ERROR_CREATE_CONVERSATION]", error);
        }
      }

      // redirect to the conversation if found
      router.push(`/messages/${conversationTogether}`);
    } catch (error) {
      console.error(error);
      console.log("[ERROR_FETCH_CONVERSATION]", error);
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className="">
      <div className={cn("flex items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700/30")}>
        <UserAvatar
          src={src}
          alt={name}
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-white">{name}</p>
        </div>
      </div>
    </button>
  );
};

export default UserBox;
