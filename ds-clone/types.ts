import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketServerIO } from "socket.io";
import { Member, Server, User } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[];
};

export type MembersWithUsers = Member & {
  user: User;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketServerIO;
    };
  };
};
