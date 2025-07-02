// creating server invites:

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import client from "@/app/libs/prismadb";

interface InviteParams {
  serverId: string;
}

export async function POST(req: NextRequest, { params }: { params: InviteParams }) {
  try {
    const server = await client?.server.findUnique({
      where: {
        id: params.serverId,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }
    let invite = null;
    const inviteKey = uuidv4();
    const reqData = await req.json();

    // check if there is reqData so we can set expiration
    if (reqData?.expires) {
      invite = await client?.serverInvite.create({
        data: {
          serverId: server.id,
          inviteKey: inviteKey,
          //set expiration to 1 day from now
          isEndless: false,
          // TODO: make max link uses configurable
          link: `${process.env.NEXTAUTH_URL}invite/${inviteKey}`,
          expires: reqData.expires,
        },
      });
    } else {
      invite = await client?.serverInvite.create({
        data: {
          serverId: server.id,
          inviteKey: inviteKey,
          isEndless: true,
          // TODO: make max link uses configurable
          link: `${process.env.NEXTAUTH_URL}invite/${inviteKey}`,
          expires: "NEVER",
        },
      });
    }
    return NextResponse.json({ message: "Invite created", data: invite });
  } catch (error) {
    console.log("[INVITE_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500, statusText: error as string });
  }
}
