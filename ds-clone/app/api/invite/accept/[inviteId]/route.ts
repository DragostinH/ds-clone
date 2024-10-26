import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

interface InviteAcceptParams {
  inviteId: string;
}

export async function POST(req: NextRequest, { params }: { params: InviteAcceptParams }) {
  const authUser = await getAuthUser();
  console.log("[PARAMS FOR THIS SHITTTTTTTTTTT", params);

  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const serverInvite = await client?.serverInvite.findUnique({
      where: {
        id: params.inviteId,
      },
      include: {
        server: true,
      },
    });

    if (!serverInvite) {
      return NextResponse.json({ message: "Invite not found" }, { status: 404 });
    }

    const { serverId: serverId } = serverInvite;
    const serverInviteUses = await client?.serverInviteUses.create({
      data: {
      inviteId: params.inviteId,
      usedBy: authUser.id,
      serverId: serverId,
      usedAt: new Date().toISOString(),
      },
    });

    const serverMember = await client?.member.create({
      data: {
        userId: authUser.id,
        serverId: serverId,
      },
    });

    return NextResponse.json({ message: "Invite accepted", data: { serverInviteUses, serverMember } });
  } catch (error) {
    console.error("[INVITE_ACCEPT_ERROR]", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
