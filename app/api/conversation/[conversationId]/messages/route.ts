import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { ConversationWithMessagesWithSender, MessageWithConversationWithSender, MessageWithSender } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const MESSAGE_BATCH = 10;

interface ConversationId {
  conversationId: string;
}

export async function GET(req: NextRequest, { params }: { params: ConversationId }) {
  try {
    const authUser = await getAuthUser();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");
    const conversationId = params.conversationId || searchParams.get("conversationId");

    console.log("[GET_ALL_CONVERSATION_MESSAGES]", conversationId);

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation missing", { status: 400 });
    }

    let conversationMessages: MessageWithSender[] = [];
    if (cursor) {
      conversationMessages = await client?.message.findMany({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          conversationId,
        },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      conversationMessages = await client?.message.findMany({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        where: {
          conversationId,
        },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = conversationMessages.length > 0 ? conversationMessages[conversationMessages.length - 1].id : null;

    if (conversationMessages.length === MESSAGE_BATCH) {
      nextCursor = conversationMessages[conversationMessages.length - 1].id;
    }

    return NextResponse.json({
      items: conversationMessages,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    console.log("[ERROR_GETTING_ALL_CONVERSATION_MESSAGES]", error);
    return new Response("Internal server error", { status: 500 });
  }
}
