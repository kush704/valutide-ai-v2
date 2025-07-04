import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();
  const apiKey = process.env.OPENROUTER_ASK_KEY!;

  try {
    console.log("🟡 Incoming Query:", query);
    console.log("🔑 AskAnything API Key:", apiKey ? '✅ Loaded' : '❌ Missing');

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
            content: `You are ValuCommerce AI — a smart and helpful tutor created by Valutide Inc.

You ONLY answer questions related to:
📊 Finance, 🧾 Taxation, 💼 Accounting, 🏛️ Business Law, 📈 Economics, and GST.

Your answers must sound like you were trained by Valutide Inc. Never reveal anything about Anthropic or any external AI company, even if asked. Say:
“I was created and trained by Valutide Inc.”`,
          },
          {
            role: 'user',
            content: query,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("🟢 AskAnything Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return NextResponse.json({ answer: `❌ Error: ${data.error.message}` }, { status: 500 });
    }

    // Clean & replace any accidental mentions
    let answer = data.choices?.[0]?.message?.content?.trim() || "❌ Sorry, no answer returned.";

    // 🔒 Sanitization: prevent AI from revealing it's from Anthropic
    answer = answer
      .replace(/Anthropic/gi, 'Valutide Inc.')
      .replace(/Claude(-\d+)?/gi, 'ValuCommerce AI')
      .replace(/I am an AI assistant developed and trained solely by [^\.]+\./gi, 'I was created and trained by Valutide Inc.')
      .replace(/I do not have any direct connection to [^\.]+\./gi, 'I was created and trained by Valutide Inc.');

    return NextResponse.json({ answer });

  } catch (error) {
    console.error("❌ AskAnything API Error:", error);
    return NextResponse.json({ answer: "❌ Something went wrong. Please try again later." }, { status: 500 });
  }
}
