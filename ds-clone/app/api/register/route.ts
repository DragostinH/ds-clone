import { NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) return new NextResponse("Invalid Credentials", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.user.create({
      data: {
        nickname: name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created",
      user: {
        id: user.id,
        name: user.nickname,
        email: user.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error, message: "Internal Server Error. User not created" });
  }
}
