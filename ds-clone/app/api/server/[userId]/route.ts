import { NextRequest, NextResponse } from "next/server";

interface ServerUserId {
  userId: string;
}

export async function GET(req: NextRequest, params: ServerUserId) {
  try {
    const data = req;

    const servers = await prisma?.server.findMany({
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json({ servers });
  } catch (error) {
    console.log("[SERVER_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
