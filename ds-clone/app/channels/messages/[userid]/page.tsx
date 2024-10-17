"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const ConversationPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userid = useParams().userid;

  const fetchConversation = async () => {
    try {
      const conversation = await axios.get(`/api/conversation/${userid}`).then((response) => {
        if (response.status === 200) {
          router.push(`/channels/messages/${userid}/${response.data.conversation.id}`);
          return response.data;
        } else {
          router.push("/channels/messages");
        }
      });

      return conversation;
    } catch (error) {}
  };

  useMemo(() => {
    setLoading(true);
    fetchConversation();
  }, [userid]);
  return (
    <div className="">
      <div className="">{userid}</div>
    </div>
  );
};

export default ConversationPage;
