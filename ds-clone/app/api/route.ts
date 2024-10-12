// testing '/' route

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextAuthOptions } from "next-auth";
import { MongoClient } from "mongodb";
import client from "@/app/libs/prismadb";

export async function GET(req: NextRequest) {
  await client.$connect();
  const users = await client.user.findMany();

  return NextResponse.json({ message: "Hello World", data: users });
}
