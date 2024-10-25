import { auth } from "@/app/actions/getAuth";
import getAuthUser from "@/app/actions/getAuthUser";
import { CurrentProfile } from "@/lib/CurrentProfile";
import { format, compareAsc } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";
import AcceptInviteBox from "../../components/AcceptInviteBox";

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
  const existingServer = await prisma?.serverInvite.findFirst({
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
  if (members.find((member) => member.userId === authUser.id)) return redirect(`/servers/${serverId}`);

  const serverInviteUses = await prisma?.serverInvite.findMany({
    where: {
      serverId,
    },
  });

  if (!serverInviteUses || serverInviteUses.length === maxUses) return redirect("/");

  if (isEndless && compareAsc(expires, format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")) === 1) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <AcceptInviteBox
          serverId={serverId}
          serverName={name}
          serverMembers={members}
          serverImage={imageUrl ?? ""}
          inviteId={serverInviteId}
        />
      </div>
    );
  }

  // //   if (!isEndless && usesCount >= maxUses) return redirect("/");

  //   //   if user is already in server, redirect to server
  //   const isUserInServer = await prisma?.member.findFirst({
  //     where: {
  //       userId: authUser.id,
  //       serverId,
  //     },
  //   });

  //   if (isUserInServer) return redirect(`/server/${serverId}`);
  //   if invite is valid, show join server modal

  return (
    <div className="h-full flex items-center justify-center flex-col">
      <h1>Join Server</h1>
      <h1>Auth user:{authUser?.id}</h1>
      <h1>Server: {existingServer?.server.id}</h1>
    </div>
  );
};

export default InviteCodePage;
