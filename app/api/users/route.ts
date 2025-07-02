import getAuthUser from "@/actions/getAuthUser";
import { UserWithConversations } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { User } from "@prisma/client";
import e from "cors";
const USERS_BATCH = 10;

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");

    let users: User[] = [];
    if (cursor) {
      users = await client?.user.findMany({
        take: limit ? parseInt(limit) : USERS_BATCH,
        skip: 1,
        select: {
          id: true,
          nickname: true,
          image: true,
          conversationIds: true,
          status: true,
        },
        cursor: {
          id: cursor,
        },
        where: {
          NOT: {
            id: authUser.id,
          },
        },
      });
    } else {
      users = await client?.user.findMany({
        take: limit ? parseInt(limit) : USERS_BATCH,
        // skip: 1,
        select: {
          id: true,
          nickname: true,
          image: true,
          conversationIds: true,
          status: true,
        },
        where: {
          NOT: {
            id: authUser.id,
          },
        },
      });
    }

    if (!users) return [];

    let nextCursor = users.length < USERS_BATCH ? null : users[users.length - 1].id;

    if (users.length === USERS_BATCH) {
      nextCursor = users[users.length - 1].id;
    }

    return NextResponse.json({ items: users, nextCursor });
  } catch (error) {
    console.log("[GETTING_USERS_ERROR]", error);
  }
}
