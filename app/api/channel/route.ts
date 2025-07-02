import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { Channel, MemberRole } from "@prisma/client";
import getAuthUser from "@/actions/getAuthUser";

export async function GET(req: Request) {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Channel name cannot be 'general'", { status: 400 });
    }

    // we want only the owner and moderator to create a channel:
    const server = await client.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: authUser.id,
            role: {
              in: [MemberRole.OWNER, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            userId: authUser.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNELS_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
