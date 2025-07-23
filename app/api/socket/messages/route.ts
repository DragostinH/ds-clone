import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import client from '@/app/libs/prismadb';
import { MessageWithSender } from '@/types';

export async function POST(req: NextRequest) {
  try {
    // Get auth user from session
    const authUser = await getServerSession(options);
    
    if (!authUser?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { body, image } = await req.json();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');

    if (!body && !image) {
      return NextResponse.json({ message: "body and or file missing" }, { status: 400 });
    }

    if (!conversationId) {
      return NextResponse.json({ message: "conversationId missing" }, { status: 400 });
    }

    // Find the conversation
    const conversation = await client?.conversation.findFirst({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
    }

    const messageKey = `chat:conversation:${conversationId}:messages`;

    // Create the message
    const message: MessageWithSender = await client?.message.create({
      data: {
        body,
        image,
        senderId: authUser.user.id,
        seenAt: new Date(),
        seenBy: {
          connect: {
            id: authUser.user.id,
          },
        },
        conversationId: conversation.id,
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

    // Update conversation
    const updatedConversation = await client?.conversation.update({
      where: {
        id: conversationId,
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

    const conversationParticipants = conversation?.userIds;

    if (!conversationParticipants) {
      return NextResponse.json({ message: "Participants not found" }, { status: 400 });
    }

    // Emit to socket rooms using global io instance
    if (global.io) {
      // Send to conversation room
      global.io.to(`conversation:${conversation.id}`).emit(messageKey, message);
      
      // Send conversation list updates to participants
      for (const participant of conversationParticipants) {
        global.io.to(`conversation:${conversation.id}`).emit(
          `chat:conversation-list:update:${participant}`, 
          { userId: participant, updatedConversation }
        );
      }
    }

    return NextResponse.json({ 
      message: "Message sent", 
      data: message, 
      conversation: updatedConversation 
    });

  } catch (error) {
    console.error("[POSTING_MESSAGE_SOCKET_ERROR]", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 