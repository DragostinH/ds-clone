import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const MESSAGE_BATCH = 10;

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");
    const channelId = searchParams.get("channelId");

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel missing", { status: 400 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await client?.message.findMany({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await client?.message.findMany({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = messages.length > 0 ? messages[messages.length - 1].id : null;

    if (messages.length === MESSAGE_BATCH) {
      nextCursor = messages[messages.length - 1].id;
    }

    return NextResponse.json({
      messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[MESSAGES_GET_ERROR]", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
