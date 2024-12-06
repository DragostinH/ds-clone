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
    const { conversationId } = req.query;

    const messageKey = `conversations:${conversationId}:list`;

    res?.socket?.server?.io?.emit(messageKey, { message: "Message sent" });

    return res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.log("[ITS NOT POSTING CONVERSATIONS]", error);
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
