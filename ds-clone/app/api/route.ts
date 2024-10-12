// testing '/' route

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextAuthOptions } from "next-auth";
import { MongoClient } from "mongodb";
import client from "@/app/libs/db"

export async function GET(req: NextRequest) {
    await client.connect();
    const database = client.db('discord_clonse');
    const data = await database.collection('users').find({}).toArray()

    console.log(database);

    return NextResponse.json({ message: "Hello World", data: data });
}