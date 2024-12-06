import getAuthUser from "@/actions/getAuthUser";
import { CurrentProfile } from "@/lib/CurrentProfile";
import { format, compareAsc } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";
import AcceptInviteBox from "../../components/AcceptInviteBox";
import client from "@/app/libs/prismadb";
import { Expires } from "@prisma/client";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage: React.FC<InviteCodePageProps> = async ({ params: { inviteCode } }) => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/login");

  if (!inviteCode) return redirect("/");

  //   check if server exists if not redirect to home
  const existingServer = await client?.serverInvite.findFirst({
    where: {
      inviteKey: inviteCode,
    },
    include: {
      server: {
        include: {
          members: true,
        },
      },
    },
  });

  if (!existingServer) return redirect("/");

  //   destructure all necessary data from the server

  const { id: serverId, imageUrl, members, name } = existingServer.server;
  const { id: serverInviteId, maxUses, isEndless, expires } = existingServer;

  //   if user is already in server, redirect to server
  if (members.find((member) => member.userId === authUser.id)) {
    return redirect(`/servers/${serverId}`);
  }

  const serverInviteUses = await client?.serverInviteUses.findMany({
    where: {
      serverId,
    },
  });

  // if (serverInviteUses.length === maxUses) return redirect("/");

  if (isEndless && expires === Expires.NEVER) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <AcceptInviteBox
          serverId={serverId}
          serverName={name}
          serverMembers={members}
          image={imageUrl ?? ""}
          inviteId={serverInviteId}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center flex-col">
      <h1>Join Server</h1>
      <h1>Auth user:{authUser?.id}</h1>
      <h1>Server: {existingServer?.server.id}</h1>
    </div>
  );
};

export default InviteCodePage;
