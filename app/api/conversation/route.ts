import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const conversations = await client?.conversation.findMany();
    return NextResponse.json({ conversations });
  } catch (error) {
    console.log("[ERROR_GET_CONVERSATIONS]", error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json("Unauthorized", { status: 401 });

    const { userId } = await req.json();

    const conversation = await client?.conversation.create({
      data: {
        users: {
          connect: [{ id: authUser.id }, { id: userId }],
        },
        createdAt: new Date(),
      },
    });
    return NextResponse.json({ conversation });
  } catch (error) {
    console.log("[ERROR_CREATE_CONVERSATION]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
