import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/app/libs/prismadb";
import { MessageWithSender, NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { format } from "date-fns";

const dateFormat = "yyyy-MM-dd HH:mm:ss";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const authUser = (await getServerSession(req, res, options)) as { user: { id: string; name?: string | null; email?: string | null; image?: string | null } };
    const { body, image } = req.body;
    const { conversationId } = req.query;
    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized", authUser });
    }

    if (!body && !image) {
      return res.status(400).json({ message: "body and or file missing" });
    }

    if (!conversationId) {
      return res.status(400).json({ message: "conversationId missing" });
    }

    // find the conversation where the message belongs to
    const conversation = await client?.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
    });

    const messageKey = `chat:conversation:${conversationId}:messages`;

    // create the message and connect to the conversation
    const message: MessageWithSender = await client?.message.create({
      data: {
        body,
        image,
        senderId: authUser?.user?.id,
        seenAt: new Date(),
        seenBy: {
          connect: {
            id: authUser?.user?.id,
          },
        },
        conversationId: conversation?.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            nickname: true,
            image: true,
          },
        },
      },
    });

    //update the conversation to reflect the new message
    const updatedConversation = await client?.conversation.update({
      where: {
        id: conversationId as string,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: message.id,
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

        users: {
          select: {
            id: true,
            nickname: true,
            image: true,
          },
        },
      },
    });

    const conversatinoParticipants = conversation?.userIds;

    if (!conversatinoParticipants) {
      return res.status(400).json({ message: "Participants not found" });
    }

    // send the unique conversation list separately to every participant in the room
    for (const participant of conversatinoParticipants) {
      res?.socket?.server?.io?.to(`conversation:${conversation.id}`).emit(`chat:conversation-list:update:${participant}`, { userId: participant, updatedConversation: updatedConversation });
    }
    res?.socket?.server?.io?.emit(messageKey, message);
    return res.status(200).json({ message: "Message sent", data: message, conversation: updatedConversation });
  } catch (error) {
    console.log("[POSTING_MESSAGE_SOC KET_ERROR]", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
