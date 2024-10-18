import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const conversations = await prisma?.conversation.findMany();
    return NextResponse.json({ conversations });
  } catch (error) {
    return NextResponse.error();
  }
}

// export async function POST(req: Request) {
//     try {
//         const { name } = await req.json();
//         const channel = await client.channel.create({
//             data: {
//                 name,
//             },
//         });
//         return NextResponse.json(channel);
//     } catch (error) {
//         return NextResponse.error();
//     }
// }

// export async function PUT(req: Request) {
//     try {
//         const { id, name } = await req.json();
//         const channel = await client.channel.update({
//             where: {
//                 id,
//             },
//             data: {
//                 name,
//             },
//         });
//         return NextResponse.json(channel);
//     } catch (error) {
//         return NextResponse.error();
//     }
// }

// export async function DELETE(req: Request) {
//     try {
//         const { id } = await req.json();
//         await client.channel.delete({
//             where: {
//                 id,
//             },
//         });
//         return NextResponse.json({ message: "Channel deleted" });
//     } catch (error) {
//         return NextResponse.error();
//     }
// }

// get find if the user has a conversation with the logged in user
