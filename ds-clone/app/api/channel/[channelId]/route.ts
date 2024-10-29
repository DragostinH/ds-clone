import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ServerChannelId {
  channelId: string;
}

export async function GET(req: Request) {
  return NextResponse.json({ message: "Hello World id" });
}

export async function DELETE(req: NextRequest, { params }: { params: ServerChannelId }) {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server not found", { status: 404 });
    }

    const server = await client?.server.update({
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
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNELS_DELETE_ERROR]", error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: ServerChannelId }) {
  try {
    const { searchParams } = new URL(req.url);

    const authUser = await getAuthUser();
    const serverId = searchParams.get("serverId");
    const channelId = params.channelId;
    const { name, type } = await req.json();

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server not found", { status: 404 });
    }

    if (!channelId) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    if (name === "general") {
      return new NextResponse("Cannot update general channel", { status: 400 });
    }

    if (!name || !type) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const server = await client?.server.update({
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
          update: {
            where: {
              id: channelId,
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNELS_PATCH_ERROR]", error);
  }
}
