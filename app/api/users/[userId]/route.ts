import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const authUser = await getAuthUser();

        if (!authUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { userId } = params;

        if (!userId) {
            return new NextResponse("User missing", { status: 400 });
        }

        const user = await client?.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("[GET_USER]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
