"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const userid = useParams().userid;
  const session = useSession().data?.user;
  const conversationId = useParams().conversationid;

  const fetchConversation = async () => {
    try {
      const conversation = await axios.get(`/api/conversation/${conversationId}`).then((response) => {});
    } catch (error) {}
  };

  return (
    <div className="">
      <div className="">
        {userid} + {session?.name}
      </div>
    </div>
  );
};

export default Chat;
