import getAuthUser from "@/actions/getAuthUser";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const conversations = await prisma?.conversation.findMany();
    return NextResponse.json({ conversations });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json("Unauthorized", { status: 401 });

    const { userId } = await req.json();
    console.log("[USER_ID]", userId);


    // check again if both users have a conversation together
    const joinCoversation = await prisma?.conversation.findFirst({
      where: {
        userIds: {
          hasEvery: [authUser.id, userId],
        },
      },
    });

    if (!joinCoversation) {
      const newConversation = await prisma?.conversation.create({
        data: {
          users: {
            connect: [{ id: authUser.id }, { id: userId }],
          },
        },
      });

      return NextResponse.json({ conversation: newConversation });
    }
  } catch (error) {
    console.log("[ERROR_CREATE_CONVERSATION]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
