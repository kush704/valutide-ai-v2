import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert answer checker. Verify students’ notebook answers based on the given question and explain mistakes.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ result: "Sorry, AI couldn't understand the input properly." });
    }

    const result = data.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ result: 'Sorry, an error occurred while processing your request.' });
  }
}


