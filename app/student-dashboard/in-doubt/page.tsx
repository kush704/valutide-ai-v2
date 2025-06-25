'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@/hooks/usechat';
import { supabase } from '@/lib/supabaseclient';
import Tesseract from 'tesseract.js';

const InDoubt = () => {
  const {
    chatId,
    messages,
    loading,
    setChatId,
    startNewChat,
    addMessage,
  } = useChat();

  const [userQuery, setUserQuery] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sidebarChats, setSidebarChats] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [aiThinking, setAiThinking] = useState(false);

  // Load unique chat IDs for sidebar
  useEffect(() => {
    const loadChats = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('chat_id')
        .order('created_at', { ascending: false });

      if (data) {
        const uniqueIds = Array.from(new Set(data.map((msg) => msg.chat_id)));
        setSidebarChats(uniqueIds);
      }
    };

    loadChats();
  }, [chatId]);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery && !imageFile) return;

    let finalQuery = userQuery;

    if (imageFile) {
      const ocrResult = await Tesseract.recognize(imageFile, 'eng');
      finalQuery = ocrResult.data.text.trim();
      setUserQuery(finalQuery);
    }

    const userMsg = {
      chat_id: chatId!,
      role: 'user' as const,
      content: finalQuery,
    };

    await addMessage(userMsg);
    setUserQuery('');
    setAiThinking(true);

    const res = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalQuery }),
    });

    const data = await res.json();

    let reply = data.response;
    reply = reply
      .replace(/As an AI language model,? ?/gi, '')
      .replace(/I cannot/gi, "Let's break it down together:")
      .replace(/I'm just an AI/gi, "Here's how I can explain it")
      .replace(/Based on my training/gi, "From what I know");

    await addMessage({
      chat_id: chatId!,
      role: 'ai',
      content: reply,
    });

    setAiThinking(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 bg-gray-100 p-4 space-y-2 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">💬 Chats</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ⋮
            </button>
          </div>

          <button
            onClick={startNewChat}
            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            ➕ New Chat
          </button>

          <div className="space-y-1 mt-4">
            {sidebarChats.map((id, idx) => (
              <button
                key={id}
                onClick={() => setChatId(id)}
                className={`w-full text-left p-2 rounded-lg ${
                  id === chatId ? 'bg-blue-200 font-bold' : 'hover:bg-blue-100'
                }`}
              >
                Chat {sidebarChats.length - idx}
              </button>
            ))}
          </div>
        </div>
      )}

      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="absolute top-4 left-4 z-10 text-gray-700 bg-white px-2 py-1 rounded shadow"
        >
          ⋮
        </button>
      )}

      {/* Main chat section */}
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat flex flex-col justify-between p-4 md:p-6"
        style={{ backgroundImage: "url('/in-doubt-bg.png')" }}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-blue-800 text-center mb-4">
          📘 Ask Your Doubt
        </h1>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-w-3xl w-full mx-auto relative">
          {messages.length === 0 && !loading && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl md:text-3xl font-bold text-pink-500 animate-pulse">
                Ask anything... 📚✨
              </p>
              <p className="text-md mt-2 text-gray-500">
                Valutide AI covers all subjects!
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl shadow-md max-w-[80%] break-words ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                  : 'bg-white text-gray-800 self-start mr-auto'
              }`}
            >
              {msg.content}
            </div>
          ))}

          {aiThinking && (
            <div className="flex items-center space-x-2 p-3 rounded-xl shadow-md bg-white text-gray-600 w-fit">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Valutide AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleQuerySubmit}
          className="w-full max-w-3xl mx-auto flex items-center p-2 bg-white rounded-xl shadow-md gap-2"
        >
          {/* Upload Image */}
          <label className="cursor-pointer text-xl text-gray-600 hover:text-blue-600">
            📷
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImageFile(file);
              }}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow px-4 py-3 text-gray-900 bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />

          <button
            type="submit"
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default InDoubt;
