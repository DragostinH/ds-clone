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
    const authUser = await getServerSession(req, res, options);
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
        conversationId: conversationId as string,
      },
    });

    const messageKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(messageKey, message);

    return res.status(200).json({ message: "Message sent", data: message });
  } catch (error) {
    console.log("[MESSAGES_POST_ERROR]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
