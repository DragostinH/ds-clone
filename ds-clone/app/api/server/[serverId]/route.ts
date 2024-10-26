import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface ServerUserId {
  serverId: string;
}

export async function GET(req: NextRequest, params: ServerUserId) {
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

export async function PATCH(req: NextRequest, { params }: { params: ServerUserId }) {
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
