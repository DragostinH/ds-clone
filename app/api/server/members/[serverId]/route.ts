import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface ServerId {
  serverId: string;
}

export async function GET(req: NextRequest, props: { params: Promise<ServerId> }) {
  const params = await props.params;
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const members = await client?.member.findMany({
      where: {
        serverId: params.serverId,
      },
      include: {
        user: true,
      },
    });

    if (!members) {
      return new NextResponse("Members not found", { status: 404 });
    }

    return NextResponse.json({ members });
  } catch (error) {
    console.log("[MEMBERS_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
