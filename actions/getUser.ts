import getSession from "./getSession";

export default async function getUser(email?: string, id?: string) {
  try {
    const session = await getSession();
    if (!session?.user?.email) throw new Error("Unauthorized");
    const user = await prisma?.user.findUnique({
      where: {
        email,
        id,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
  }
}
