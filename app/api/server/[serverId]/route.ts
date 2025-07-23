import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface ServerUserId {
  serverId: string;
}

export async function GET(req: NextRequest, props: { params: Promise<ServerUserId> }) {
  const params = await props.params;
  try {
    const authUser = getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await client?.server.findFirst({
      where: {
        id: params.serverId,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    return NextResponse.json({ server });
  } catch (error) {
    console.log("[SERVER_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, props: { params: Promise<ServerUserId> }) {
  const params = await props.params;
  try {
    const authUser = getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { name, imageUrl } = await req.json();
    const server = await client?.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json({ server });
  } catch (error) {
    console.log("[SERVER_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<ServerUserId> }) {
  const params = await props.params;
  try {
    const authUser = getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    // Start a transaction
    const deleteTransaction = await client?.$transaction([
      client?.serverInviteUses.deleteMany({
        where: {
          serverId: params.serverId,
        },
      }),
      client?.serverInvite.deleteMany({
        where: {
          serverId: params.serverId,
        },
      }),

      client?.member.deleteMany({
        where: {
          serverId: params.serverId,
        },
      }),

      client?.channel.deleteMany({
        where: {
          serverId: params.serverId,
        },
      }),

      client?.server.delete({
        where: {
          id: params.serverId,
        },
      }),
    ]);

    return NextResponse.json({ message: `Server ${deleteTransaction[4].name} and all its relation data has been deleted.` });
  } catch (error) {
    console.log("[SERVER_DELETE_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
