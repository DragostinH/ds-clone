"use client";

import { Conversation } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatView from "./components/ChatView";

const ConversationPage = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Conversation>();
  const session = useSession();
  const router = useRouter();
  const userid = useParams().userid;

  const fetchConversation = async () => {
    try {
      const resp = await axios.get(`/api/conversation/${userid}`);
      if (resp.status === 200) {
        setConversation(resp.data.conversation);
      }

      return conversation;
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    fetchConversation();
  }, [userid]);
  return (
    <div
      className="chatPageContainer_
      min-w-0
      min-h-0
      flex
      flex-col
      relative
      overflow-hidden
      flex-auto
    ">
      <ChatHeader user={conversation?.users[1]} />
      <ChatView />
    </div>
  );
};

export default ConversationPage;
