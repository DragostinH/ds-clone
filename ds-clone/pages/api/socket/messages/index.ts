import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/app/libs/prismadb";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const authUser = await getServerSession(req, res, options);
    const { body, image } = req.body;
    const { serverId, channelId } = req.query;
    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized", authUser });
    }

    if (!body && !image) {
      return res.status(400).json({ message: "body and or file missing" });
    }

    if (!serverId || !channelId) {
      return res.status(400).json({ message: "Server or channel missing" });
    }

    const server = await client.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: authUser?.user?.id,
          },
        },
      },

      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await client.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: server.id,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = server.members.find((m) => m.userId === authUser?.user?.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await client?.message.create({
      data: {
        body,
        image,
        senderId: member.id,
        sender: authUser?.user?.id,
        seenAt: null,
      },
    });
  } catch (error) {
    console.log("[MESSAGES_POST_ERROR]", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
