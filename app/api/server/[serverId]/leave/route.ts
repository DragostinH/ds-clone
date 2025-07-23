import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface ServerUserId {
  serverId: string;
}

export async function PATCH(req: NextRequest, props: { params: Promise<ServerUserId> }) {
  const params = await props.params;
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("[SERVER_iD]", params);

    if (!params.serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    const server = await client?.server.update({
      where: {
        id: params.serverId,
        userId: {
          not: authUser.id,
        },
        members: {
          some: {
            userId: authUser.id,
          },
        },
      },

      data: {
        members: {
          deleteMany: {
            userId: authUser.id,
          },
        },
      },
    });

    return NextResponse.json({ server });
  } catch (error) {
    console.log("[SERVER_PATCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
