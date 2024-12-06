import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/app/libs/prismadb";
import { NextApiResponseServerIo } from "@/types";
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

    const conversation = await client?.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
    });

    const message = await client?.message.create({
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
        sender: true,
      },
    });

    const messageKey = `chat:conversation:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(messageKey, message);
    // emit logic to update the conversation list for the users in the conversation

    return res.status(200).json({ message: "Message sent", data: message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
