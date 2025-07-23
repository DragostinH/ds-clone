import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ otherUserId: string }> }) {
  const params = await props.params;
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { otherUserId } = params;

    if (!otherUserId) {
      return new NextResponse("Other user is missing!", { status: 400 });
    }

    const conversation = await client?.conversation.findFirst({
      where: {
        userIds: {
          hasEvery: [authUser.id, otherUserId],
        },
      },
      select: {
        id: true,
      },
    });

    if (!conversation) return NextResponse.json({ conversationId: null });

    return NextResponse.json({ conversationId: conversation.id });
  } catch (error) {
    console.error("[GET_CONVERSATION]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
