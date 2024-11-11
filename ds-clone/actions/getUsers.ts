import client from "@/app/libs/prismadb";
import getSession from "./getSession";
import getAuthUser from "./getAuthUser";

const USERS_BATCH = 10;

export default async function getUsers() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return [];
    
    const users = await client?.user.findMany({
      take: USERS_BATCH,
      where: {
        NOT: {
          id: authUser.id,
        },
      },
      include:{
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
