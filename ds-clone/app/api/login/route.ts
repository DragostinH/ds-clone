import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  try {
    if (!email || !password) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }
    
  } catch (queryError: any) {
    return NextResponse.json({
      status: 500,
      error: queryError,
      message: "Internal Server Error. User not created",
    });
  }
}
