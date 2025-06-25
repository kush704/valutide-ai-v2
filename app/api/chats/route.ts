import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data } = await supabase
    .from('chats')
    .select('id, title')
    .order('created_at', { ascending: false });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { chatId, role, content } = await req.json();
  
  if (!chatId && role === 'user') {
    const first = await supabase
      .from('chats')
      .insert({ title: content })
      .select('id')
      .single();
    const newChatId = first.data?.id;
    await supabase.from('messages').insert({ chat_id: newChatId, role, content });
    return NextResponse.json({ chatId: newChatId });
  }
  
  if (chatId) {
    await supabase.from('messages').insert({ chat_id: chatId, role, content });
    return NextResponse.json({ ok: true });
  }
  
  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
