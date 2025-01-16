import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      // cors: {
      //   origin: "*", // allow all origins
      //   methods: ["GET", "POST"],
      // },
      path: path,
      // addTrailingSlash: false,
      // transports: ["websocket", "polling"],
    });
    res.socket.server.io = io;

    console.log("Socket.io server created");

    // event listeners here:
    io.on("connection", (socket) => {
      console.log("New client connected", socket.id);

      // handling join conversation events
      socket.on("join-conversation", ({ conversationId, userId }) => {
        console.log("join-conversation", conversationId, userId);
        const conversationRoom = `conversation:${conversationId}`;
        socket.join(conversationRoom);

        socket.to(conversationRoom).emit("user-joined", { conversationId, userId });
        console.log(`User ${userId} joined room ${conversationRoom}`);
      });

      // handling leave conversation events
      socket.on("leave-conversation", ({ conversationId, userId }) => {
        console.log("leave-conversation", conversationId, userId);
        const conversationRoom = `conversation:${conversationId}`;
        socket.leave(conversationRoom);

        socket.to(conversationRoom).emit("user-left", { conversationId, userId });
        console.log(`User ${userId} left room ${conversationRoom}`);
      });

      socket.on("message-seen", (message) => {});

      socket.on("first-message", ({ conversationId, userId }) => {
        console.log("first-message", conversationId, userId);
        const conversationRoom = `conversation:${conversationId}`;
        socket.join(conversationRoom);

        socket.to(conversationRoom).emit("user-joined", { conversationId, userId });
        console.log(`User ${userId} joined room ${conversationRoom}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }

  res.end();
};

export default ioHandler;
