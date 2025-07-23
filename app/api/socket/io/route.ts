import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    // This route is handled by the custom server
    // The actual WebSocket logic is in server.js
    return new Response('WebSocket endpoint', { status: 200 });
}

export async function POST(req: NextRequest) {
    // This route is handled by the custom server
    // The actual WebSocket logic is in server.js
    return new Response('WebSocket endpoint', { status: 200 });
} 