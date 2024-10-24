import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import bcrypt from "bcryptjs"; // Note: Check the library is correctly imported

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nickname, email, password } = body;

    if (!nickname || !email || !password) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }

    // Verify that the password is being passed correctly
    console.log("p------", password);

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if hashedPassword is being generated
    console.log("Hashed password: ", hashedPassword);

    const user = await prisma?.user.create({
      data: {
        nickname, // Ensure this is 'nickname' and not 'name'
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created",
      user,
    });
  } catch (error: any) {
    console.error("Error creating user: ", error);
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Internal Server Error. User not created",
    });
  }
}
