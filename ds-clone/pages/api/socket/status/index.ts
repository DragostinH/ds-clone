import { options } from "@/app/api/auth/[...nextauth]/options";
import client from "@/app/libs/prismadb";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const authUser = await getServerSession(req, res, options);
    const { status } = req.body;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized", authUser });
    }

    if (!status) {
      return res.status(400).json({ message: "status missing" });
    }

    const user = await client.user.update({
      where: {
        id: authUser?.user?.id,
      },
      data: {
        status,
      },
    });

    const statusKey = `status:${authUser?.user?.id}`;

    res?.socket?.server?.io?.emit(statusKey, status);

    return res.status(200).json({ status, message: `Status updated to: ${status}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
