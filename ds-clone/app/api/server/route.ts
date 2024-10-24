import { MemberRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";



export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getToken({ req, secret: process.env.SECRET });
    const loggedUser = await prisma?.user.findUnique({
      where: { id: session?.sub },
    });

    if (!loggedUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, imageUrl } = await req.json();
    const server = await prisma?.server.create({
      data: {
        userId: loggedUser.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              type: "TEXT",
              userId: loggedUser.id,
            },
            {
              name: "voice",
              type: "VOICE",
              userId: loggedUser.id,
            },
          ],
        },

        members: {
          create: {
            userId: loggedUser.id,
            role: MemberRole.OWNER,
          },
        },
      },
    });

    return NextResponse.json({ message: "Server created", data: server });
  } catch (error) {
    console.log("[SERVER_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
