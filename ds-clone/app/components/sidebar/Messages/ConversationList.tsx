"use client";

import { Conversation } from "@prisma/client";
import { FC } from "react";

interface ConversationListProps {
  initialItems: Conversation[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems }) => {
  return <div className="">Conversation list</div>;
};

export default ConversationList;
