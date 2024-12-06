import client from "@/app/libs/prismadb";
import getSession from "./getSession";
import getAuthUser from "./getAuthUser";
import { UserWithConversations } from "@/types";

const USERS_BATCH = 10;

export default async function getUsersWithConversation() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return [];

    const users: UserWithConversations[] = await client?.user.findMany({
      take: USERS_BATCH,
      where: {
        NOT: {
          id: authUser.id,
        },
      },
      include: {
        conversations: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) return [];

    return users;
  } catch (error) {
    console.error(error);
    console.log("[GET_USERS_ERROR]", error);
  }
}
