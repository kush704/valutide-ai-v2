// app/api/openrouter/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`, // Use env key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || 'No response from AI.';

    return NextResponse.json({ response: aiMessage });
  } catch (error: any) {
    console.error('Error from AI:', error.message || error);
    return NextResponse.json({ response: 'AI is currently unavailable. Please try again later.' });
  }
}
