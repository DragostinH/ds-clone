import { NextRequest, NextResponse } from "next/server";
import client from "@/app/libs/prismadb";
import { Channel } from "@prisma/client";


export async function GET(req: Request) {
    return NextResponse.json({ message: "Hello World" });
}





