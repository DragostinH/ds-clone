import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { UserTypeForLogin } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("authUser", authUser);
    

    const user = await client?.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        nickname: true,
        email: true,
        image: true,
        status: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const loggedUserType: UserTypeForLogin = user;

    return NextResponse.json(loggedUserType, { status: 200 });
  } catch (error) {
    console.log("ISSUE_FETCHING_LOGGED_USER", error);
  }
}
