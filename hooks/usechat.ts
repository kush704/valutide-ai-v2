'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Message {
  id?: string;
  chat_id: string;
  role: 'user' | 'ai';
  content: string;
  created_at?: string;
}

export const useChat = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Load messages on first mount or when chatId changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!chatId) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
      }

      setLoading(false);
    };

    loadMessages();
  }, [chatId]);

  // 🔁 Start a new chat session
  const startNewChat = () => {
    const newChatId = uuidv4();
    setChatId(newChatId);
    setMessages([]);
  };

  // ➕ Add a message to chat
  const addMessage = async (message: Message) => {
    setMessages((prev) => [...prev, message]);

    await supabase.from('messages').insert({
      chat_id: message.chat_id,
      role: message.role,
      content: message.content,
    });
  };

  return {
    chatId,
    messages,
    loading,
    setChatId,
    startNewChat,
    addMessage,
  };
};
