import client from "@/app/libs/prismadb";
import getAuthUser from "./getAuthUser";

const getConversations = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return [];

  try {
    const conversations = await client?.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },

      where: {
        userIds: {
          has: authUser.id,
        },
      },

      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seenBy: true,
          },
        },
      },
    });

    return conversations;
  } catch (error) {
    console.error(error);
    console.log("[GET_CONVERSATIONS_ERROR]", error);
    return [];
  }
};

export default getConversations;
