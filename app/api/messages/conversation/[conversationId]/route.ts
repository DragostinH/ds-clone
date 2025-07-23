import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { ConversationWithMessages, ConversationWithMessagesWithSender, ConversationWithMessagesWithUsers } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const MESSAGE_BATCH = 10;

interface ConversationId {
  conversationId: string;
}

export async function GET(req: NextRequest, props: { params: Promise<ConversationId> }) {
  const params = await props.params;
  try {
    const authUser = await getAuthUser();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");
    const conversationId = params.conversationId;

    console.log("[GET_ALL_CONVERSATION_MESSAGES]", conversationId);

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation missing", { status: 400 });
    }

    let conversationMessages: ConversationWithMessagesWithSender | null = null;
    if (cursor) {
      conversationMessages = await client?.conversation.findFirst({
        where: {
          id: conversationId,
        },
        include: {
          messages: {
            take: limit ? parseInt(limit) : MESSAGE_BATCH,
            skip: 1,
            cursor: {
              id: cursor,
            },
            orderBy: {
              createdAt: "desc",
            },
            include: {
              sender: {
                select: {
                  nickname: true,
                  id: true,
                  image: true,
                  status: true,
                  seenMessageIds: true,
                },
              },
            },
          },
        },
      });
    } else {
      conversationMessages = await client?.conversation.findFirst({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        where: {
          id: conversationId,
        },
        include: {
          messages: {
            take: limit ? parseInt(limit) : MESSAGE_BATCH,
            skip: 1,
            orderBy: {
              createdAt: "desc",
            },
            include: {
              sender: {
                select: {
                  nickname: true,
                  id: true,
                  image: true,
                  status: true,
                  seenMessageIds: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (!conversationMessages) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    let nextCursor = conversationMessages.messages.length > 0 ? conversationMessages.messages[conversationMessages.messages.length - 1].id : null;

    if (conversationMessages.messages.length === MESSAGE_BATCH) {
      nextCursor = conversationMessages.messages[conversationMessages.messages.length - 1].id;
    }

    return NextResponse.json({ items: conversationMessages.messages, nextCursor });
  } catch (error) {
    console.error(error);
    console.log("[ERROR_GETTING_ALL_CONVERSATION_MESSAGES]", error);
    return new Response("Internal server error", { status: 500 });
  }
}
