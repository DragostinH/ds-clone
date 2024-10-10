import { NextResponse } from "next/server";
import client from "@/app/lib/db";

export async function POST(req: Request) {
    await client.connect();
    const database = client.db('discord_clone');
    const body = await req.json();
    database.collection('users').insertOne(body);

    console.log(body);

    return NextResponse.json({ message: "Hello World", data: body });

}