import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const data = req


        const servers = await prisma?.server.findMany({
            where: {
                userId: params.userId,
            },
        });

        return NextResponse.json({ servers });
    } catch (error) {
        console.log("[SERVER_GET_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}