import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { Conversation } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { conversationId } = params;

    if (!conversationId) {
      return new NextResponse("Conversation missing", { status: 400 });
    }

    let conversation: Conversation | null = null;

    conversation = await client?.conversation.findFirst({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    return NextResponse.json({ conversation, status: 200 });
  } catch (error) {
    console.error("[GET_ALL_CONVERSATION_MESSAGES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
