import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.message;

  console.log('Feedback received:', message); // ⬅️ You can later integrate email or DB

  return NextResponse.json({ success: true });
}
