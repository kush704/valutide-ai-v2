import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_CHECKER_KEY!;

  try {
    const { prompt } = await req.json();
    console.log("🔍 Checker Prompt:", prompt);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        max_tokens: 800,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: 'You are an expert answer checker. Verify students’ notebook answers based on the given question and explain mistakes clearly and kindly.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();
    console.log("✅ Checker AI Response:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ result: "❌ Sorry, AI couldn't understand the input properly." });
    }

    const result = data.choices[0].message.content;
    return NextResponse.json({ result });

  } catch (error) {
    console.error('❌ Checker API error:', error);
    return NextResponse.json({ result: '❌ Sorry, an error occurred while processing your request.' });
  }
}
