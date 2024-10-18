import getSession from "./getSession";

const getAuthUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma?.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (!currentUser) throw new Error("User not found");

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getAuthUser;