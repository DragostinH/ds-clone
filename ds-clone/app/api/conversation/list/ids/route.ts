import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const authUser = await getAuthUser();

  if (!authUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const conversations = await client?.conversation.findMany({
      where: {
        userIds: {
          has: authUser.id,
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("[FETCH_USER_CONVERSATIONS_ERROR]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
