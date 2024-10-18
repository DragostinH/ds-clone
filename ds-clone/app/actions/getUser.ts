export default async function getUser(email?: string, id?: string) {
  try {
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
