import { NextRequest, NextResponse } from 'next/server';

async function fetchImageFromUnsplash(query: string): Promise<string | null> {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' diagram')}&per_page=1`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY!}`,
      },
    }
  );

  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular;
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ response: 'Please ask something.', imageUrl: null }, { status: 400 });
    }

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const aiData = await aiRes.json();
    const text = aiData.choices?.[0]?.message?.content || 'No answer available.';

    const imageUrl = await fetchImageFromUnsplash(message);

    return NextResponse.json({
      response: text,
      imageUrl,
    });
  } catch (err) {
    console.error('❌ API error:', err);
    return NextResponse.json({ response: 'Internal Server Error', imageUrl: null }, { status: 500 });
  }
}
