import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import { createWorker } from 'tesseract.js';

// OCR image to buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

// Fetch diagram
async function fetchImageFromUnsplash(query: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' diagram')}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY!}`,
        },
      }
    );

    const data = await res.json();
    return data.results?.[0]?.urls?.regular || null;
  } catch (err) {
    console.error('❌ Unsplash API error:', err);
    return null;
  }
}

// Model selector
function chooseModel(message: string): string {
  const lower = message.toLowerCase();
  const commerceKeywords = ['depreciation', 'journal', 'ledger', 'tax', 'balance', 'gst', 'capital'];
  const scienceKeywords = ['photosynthesis', 'fertilization', 'epididymis', 'reproduction', 'digestion'];
  const theoryKeywords = ['define', 'explain', 'what is', 'advantage', 'disadvantage'];

  if (commerceKeywords.some(word => lower.includes(word))) {
    return 'mistralai/mixtral-8x7b';
  }
  if (scienceKeywords.some(word => lower.includes(word)) || theoryKeywords.some(word => lower.includes(word))) {
    return 'mistralai/mistral-7b-instruct';
  }
  return 'openrouter/auto';
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type');
    let message = '';

    if (contentType?.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json({ response: 'No file uploaded.', imageUrl: null }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(buffer);
      await worker.terminate();

      message = text?.trim();
      console.log('📸 OCR Extracted Text:', message);
    } else {
      const body = await req.json();
      message = body.message;
    }

    if (!message || message.trim() === '') {
      return NextResponse.json({ response: 'Please provide a question or upload a clear image.', imageUrl: null }, { status: 400 });
    }

    console.log('📩 Final Query:', message);

    const selectedModel = chooseModel(message);
    const apiKey = process.env.OPENROUTER_IND_KEY!;

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: selectedModel,
        max_tokens: 1200,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `You are Valutide AI — a smart, friendly, and expert study bot built by Valutide Technologies.
Always explain clearly, support students of all levels in subjects like Commerce, Science, English, and Social Science.
Never say you're an AI or reveal you use GPT or Claude.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    let aiData = await aiRes.json();

    // Retry on credit error
    if (aiData.error?.message?.includes('credits')) {
      console.warn('🔁 Retrying with fallback model...');

      const fallbackRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          max_tokens: 800,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: `You are Valutide AI — a smart, friendly, and expert study bot built by Valutide Technologies.
Always explain clearly, support students of all levels in subjects like Commerce, Science, English, and Social Science.`,
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      });

      aiData = await fallbackRes.json();
    }

    let text = aiData.choices?.[0]?.message?.content || 'No answer available.';
    text = text
      .replace(/As an AI language model,? ?/gi, '')
      .replace(/I'm (an|a) (AI|assistant)/gi, 'Here’s how I can help you')
      .replace(/I cannot/gi, "Let's try to break it down together")
      .replace(/Based on my (training|data)/gi, "Here's what I know");

    const imageUrl = await fetchImageFromUnsplash(message);

    return NextResponse.json({ response: text, imageUrl });

  } catch (err) {
    console.error('❌ InDoubt API error:', err);
    return NextResponse.json({ response: 'Internal Server Error', imageUrl: null }, { status: 500 });
  }
}
