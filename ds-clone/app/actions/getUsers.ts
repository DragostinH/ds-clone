import getSession from "./getSession";

export default async function getUsers() {
  try {
    const session = await getSession();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const users = await prisma?.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { email: { not: session?.user?.email } },
    });

    if (!users) return [];

    return users;
  } catch (error) {
    console.error(error);
  }
}
