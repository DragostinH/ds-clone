import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/app/libs/prismadb"; // Assuming prisma client is correctly set up

export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
  try {
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionEmail = session.email;

    const loggedUser = await prisma?.user.findUnique({
      where: {
        email: sessionEmail,
      },
    });

    if (!loggedUser) {
      return NextResponse.json({ error: "Logged in user not found" }, { status: 404 });
    }

    const user = await prisma?.user.findUnique({
      where: {
        id: params.userid,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // find if conversation exists between the two users in their conversationIds array relationship
    const conversation = await prisma?.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: loggedUser.id,
              },
            },
          },
          {
            users: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },

      include: {
        users: true,
        messages: true,
      },
    });

    if (!conversation) {
      const newConversation = await prisma?.conversation.create({
        data: {
          users: {
            connect: [{ id: loggedUser.id }, { id: user.id }],
          },
        },
      });

      return NextResponse.json({ newConversation }, { status: 201 });
    }

    return NextResponse.json({ conversation }, { status: 200 });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
