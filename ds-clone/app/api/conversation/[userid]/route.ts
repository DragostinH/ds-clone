import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";


export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
    try {
        const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!session) return NextResponse.error();

        const sessionEmail = session.email;

        const loggedUserId = await prisma?.user.findUnique({
            where: {
                email: sessionEmail
            }
        });

        const user = await prisma?.user.findUnique({
            where: {
                id: params.userid
            }
        });

        const conversation = await prisma?.conversation.findFirst({
            // find if conversation exists between the two users in their conversationIds array relationship
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                id: loggedUserId?.id
                            }
                        }
                    },
                    {
                        users: {
                            some: {
                                id: user?.id
                            }
                        }
                    }
                ]
            }
        });

        if (!conversation) {
            const newConversation = await prisma?.conversation.create({
                data: {
                    users: {
                        connect: [
                            { id: loggedUserId?.id },
                            { id: user?.id }
                        ]
                    }
                }
            });

            return NextResponse.json({ conversation: newConversation });
        }
        return NextResponse.json({ conversation: conversation });

    } catch (error) {
        return NextResponse.error();
    }
}