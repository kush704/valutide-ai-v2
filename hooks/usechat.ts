'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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

export interface Chat {
  id: string;
  title: string;
}

export const useChat = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Fetch chat list for sidebar
  const fetchChats = async () => {
    const { data } = await supabase
      .from('chats')
      .select('id, title')
      .order('created_at', { ascending: false });
    if (data) setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // 🧠 Fetch messages when chatId changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!chatId) return;
      setLoading(true);

      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (data) setMessages(data);
      setLoading(false);
    };

    loadMessages();
  }, [chatId]);

  // ➕ Add a message to Supabase
  const addMessage = async (message: Message) => {
    setMessages((prev) => [...prev, message]);

    if (!chatId && message.role === 'user') {
      // First user message → create chat
      const { data, error } = await supabase
        .from('chats')
        .insert({ title: message.content.slice(0, 100) }) // Limit title length
        .select('id')
        .single();

      const newChatId = data?.id;
      setChatId(newChatId);

      await supabase.from('messages').insert({
        chat_id: newChatId,
        role: message.role,
        content: message.content,
      });

      fetchChats(); // refresh sidebar
      return;
    }

    if (chatId) {
      await supabase.from('messages').insert({
        chat_id: chatId,
        role: message.role,
        content: message.content,
      });
    }
  };

  const startNewChat = () => {
    setChatId(null);
    setMessages([]);
  };

  return {
    chatId,
    messages,
    chats,
    loading,
    setChatId,
    startNewChat,
    addMessage,
  };
};
