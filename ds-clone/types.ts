import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketServerIO } from "socket.io";
import { ChannelMessage, Conversation, Member, Message, Server, User } from "@prisma/client";
type Sender = {
  id: string;
  nickname: string;
  image: string | null;
};
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

export type UserWithConversations = User & {
  conversations: Conversation[];
};

export type ChannelMessageWithUser = ChannelMessage & {
  user: User;
};

export type ChannelMessageWithMemberWithUser = ChannelMessage & {
  member: Member & { user: User };
};

export type ConversationWithMessagesWithUsers = Conversation & {
  messages: Message[];
  users: User[];
};

export type ConversationWithUsersWithMessagesWithSender = Conversation & {
  messages: (Message & { sender: Sender })[];
  users: Sender[];
};
export type ConversationWithMessages = Conversation & {
  messages: Message[];
};

export type MessageWithSender = Message & {
  sender: Sender;
};

export type MessageWithConversationWithSender = Message & {
  conversation: Conversation & { users: User[] };
};
