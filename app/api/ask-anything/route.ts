import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful and smart AI tutor, strictly answering only about commerce topics like:
            📊 Finance, 🧾 Taxation, 💼 Accounting, 🏛️ Business Laws, 📈 Economics, and GST.
            Do not respond to non-commerce topics.`
          },
          {
            role: 'user',
            content: query
          }
        ]
      })
    });

    const data = await response.json();

    const answer = data.choices?.[0]?.message?.content || "❌ Sorry, I couldn't find a suitable answer. Try again later.";
    return NextResponse.json({ answer });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ answer: "❌ Something went wrong. Please try again later." });
  }
}
