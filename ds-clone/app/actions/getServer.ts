import getSession from "./getSession";

const getServer = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const loggedUser = await prisma?.user.findUnique({
      where: { email: session.user.email },
    });

    if (!loggedUser) throw new Error("User not found");

    const servers = await prisma?.server.findFirst({
      where: {
        members: {
          some: {
            userId: loggedUser.id,
          },
        },
      },
    });

    if (!servers) throw new Error("Server not found");

    return servers;
  } catch (error) {
    return null;
  }
};

export default getServer;
