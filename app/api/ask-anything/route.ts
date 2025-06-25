import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    console.log("🟡 Incoming Query:", query);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        max_tokens: 1000, // ✅ Reduced token usage
        messages: [
          {
            role: 'system',
            content: `You are a helpful and smart AI tutor, strictly answering only about commerce topics like:
📊 Finance, 🧾 Taxation, 💼 Accounting, 🏛️ Business Laws, 📈 Economics, and GST.
Do not respond to non-commerce topics.`,
          },
          {
            role: 'user',
            content: query,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("🟢 OpenRouter Response:", JSON.stringify(data, null, 2));

    const answer = data.choices?.[0]?.message?.content || "❌ Sorry, I couldn't find a suitable answer. Try again later.";
    return NextResponse.json({ answer });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ answer: "❌ Something went wrong. Please try again later." });
  }
}
