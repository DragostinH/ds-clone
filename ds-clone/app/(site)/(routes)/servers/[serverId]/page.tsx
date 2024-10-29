import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

const ServerIdPage: FC<ServerIdPageProps> = async ({ params: { serverId } }) => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/login");

  const server = await client?.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          userId: authUser.id,
        },
      },
    },

    include: {
      channels: {
        where: {
          name: "general",
        },

        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") return null;

  return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
