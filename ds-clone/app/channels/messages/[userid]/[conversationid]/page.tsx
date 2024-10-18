"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const userid = useParams().userid;
  const session = useSession().data?.user as { id: string };
  const conversationId = useParams().conversationid;

  const fetchConversation = async () => {
    try {
      const conversation = await axios.get(`/api/conversation/${conversationId}`).then((response) => {});
    } catch (error) {}
  };

  return (
    <div className="">
      <div className="flex gap-4">
        <span>clicked user id: {userid}</span>

        <span>logged user id: {session?.id}</span>

        <span>conversation id: {conversationId}</span>
      </div>
    </div>
  );
};

export default Chat;
