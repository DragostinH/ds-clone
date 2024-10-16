import getSession from "./getSession";

export default async function getUsers() {
	try {
		const session = await getSession();
		if (!session?.user?.email) return null;

		const users = await prisma?.user.findMany({
			orderBy: { createdAt: "desc" },
			where: { email: { not: session?.user?.email } },
		});

		if (!users) return [];

		return users;
	} catch (error) {
	}
}
