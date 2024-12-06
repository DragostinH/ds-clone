import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { ConversationWithMessages, ConversationWithMessagesWithSender } from "@/types";
import { Conversation } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "postcss";

const CONVERSATION_BATCH = 10;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");

    let conversationList: ConversationWithMessagesWithSender[] = [];

    const convListTest = await client?.conversation.findMany({
      where: {
        users: {
          some: {
            id: authUser.id,
          },
        },
      },
    });

    if (cursor) {
      conversationList = await client?.conversation.findMany({
        take: limit ? parseInt(limit) : CONVERSATION_BATCH,
        cursor: {
          id: cursor,
        },
        where: {
          users: {
            some: {
              id: authUser.id,
            },
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            include: {
              sender: {
                select: {
                  id: true,
                  nickname: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    } else {
      conversationList = await client?.conversation.findMany({
        take: limit ? parseInt(limit) : CONVERSATION_BATCH,
        where: {
          users: {
            some: {
              id: authUser.id,
            },
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            include: {
              sender: {
                select: {
                  id: true,
                  nickname: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    }

    let nextCursor = conversationList.length > 0 ? conversationList[conversationList.length - 1].id : null;

    if (conversationList.length === CONVERSATION_BATCH) {
      nextCursor = conversationList[conversationList.length - 1].id;
    }

    return NextResponse.json({
      items: conversationList,
      nextCursor,
      test: convListTest,
    });
  } catch (error) {
    console.error("[GET_ALL_CONVERSATIONS_FOR_USER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
