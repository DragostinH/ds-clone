import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { ChannelMessageWithMemberWithUser } from "@/types";
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

    let channelMessages: ChannelMessageWithMemberWithUser[] = [];

    if (cursor) {
      channelMessages = await client?.channelMessage.findMany({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      channelMessages = await client?.channelMessage.findMany({
        take: limit ? parseInt(limit) : MESSAGE_BATCH,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = channelMessages.length > 0 ? channelMessages[channelMessages.length - 1].id : null;

    if (channelMessages.length === MESSAGE_BATCH) {
      nextCursor = channelMessages[channelMessages.length - 1].id;
    }
    return NextResponse.json({
      items: channelMessages,
      nextCursor,
    });
  } catch (error) {
    console.log("[CHANNEL_MESSAGES_GET_ERROR]", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}
