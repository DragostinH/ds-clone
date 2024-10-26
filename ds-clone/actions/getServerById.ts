import client from "@/app/libs/prismadb";
import getAuthUser from "./getAuthUser";

const getServerById = async (id: string) => {
  try {
    const authUser = await getAuthUser();
    if (!authUser) throw new Error("Unauthorized");

    const server = await client?.server.findFirst({
      where: {
        members: {
          some: {
            userId: authUser.id,
          },
        },
      },

      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },

        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    if (!server) throw new Error("Server not found");

    return server;
  } catch (error) {
    console.log(error);
  }
};

export default getServerById;
