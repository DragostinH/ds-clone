import { getSession } from "next-auth/react";

export async function CurrentProfile() {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const loggedUser = await prisma?.user.findUnique({
      where: { email: session.user.email },
    });

    if (!loggedUser) throw new Error("User not found");

    return loggedUser;
  } catch (error) {
    console.error(error);
  }
}
