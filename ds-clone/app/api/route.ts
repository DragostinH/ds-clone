// testing '/' route

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextAuthOptions } from "next-auth";
import { MongoClient } from "mongodb";
import client from "@/app/libs/prismadb";
import getAuthUser from "@/actions/getAuthUser";

export async function GET(req: NextRequest) {
  const users = await client?.user.findMany();
  const authUser = await getAuthUser();
  return NextResponse.json({ message: "Hello World", data: users, authUser });
}
