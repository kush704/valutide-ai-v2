import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    console.log("🟡 Incoming Query:", query);

    // ✅ Hardcoded API key (like InDoubt section)
    const apiKey = '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';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `You are a helpful and smart AI tutor, strictly answering only about commerce topics like:
📊 Finance, 🧾 Taxation, 💼 Accounting, 🏛️ Business Laws, 📈 Economics, and GST.
Avoid all non-commerce questions. Respond in clear, paragraph-style explanations.`,
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

    if (data.error) {
      return NextResponse.json({
        answer: `❌ Error: ${data.error.message}`,
      }, { status: 500 });
    }

    const answer = data.choices?.[0]?.message?.content?.trim() || "❌ Sorry, no answer returned.";
    return NextResponse.json({ answer });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({
      answer: "❌ Something went wrong. Please try again later.",
    }, { status: 500 });
  }
}
