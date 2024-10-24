// creating server invites:

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import client from "@/app/libs/prismadb";

export async function POST(req: NextRequest, { params }: { params: { serverId: string } }) {
  try {
    const server = await client?.server.findUnique({
      where: {
        id: params.serverId,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    const inviteKey = uuidv4();

    const invite = await client?.serverInvite.create({
      data: {
        serverId: server.id,
        inviteKey: inviteKey,
        // 1 day from now
        expires: format(new Date(Date.now() + 24 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        isEndless: false,
        // TODO: make max link uses configurable
        maxUses: 1,
        link: `${process.env.NEXTAUTH_URL}invite/${inviteKey}`,
      },
    });

    return NextResponse.json({ message: "Invite created", data: invite });
  } catch (error) {
    console.log("[INVITE_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
