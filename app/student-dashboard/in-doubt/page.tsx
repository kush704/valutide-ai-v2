'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

const InDoubt = () => {
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery && !imageFile) return;

    setLoading(true);

    let finalQuery = userQuery;

    if (imageFile) {
      const ocrResult = await Tesseract.recognize(imageFile, 'eng');
      finalQuery = ocrResult.data.text.trim();
      setUserQuery(finalQuery);
    }

    setMessages((prev) => [...prev, { type: 'user', content: finalQuery }]);
    setUserQuery('');

    const response = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalQuery }),
    });

    const data = await response.json();

    // Clean GPT-style disclaimers from response
    let reply = data.response;
    reply = reply
      .replace(/As an AI language model,? ?/gi, '')
      .replace(/I cannot/gi, "Let's break it down together. Here's how:")
      .replace(/I'm just an AI/gi, "Here's how I can explain it")
      .replace(/Based on my training/gi, "From what I know");

    setMessages((prev) => [...prev, { type: 'ai', content: reply }]);
    setLoading(false);
    setImageFile(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between p-4 md:p-6"
      style={{ backgroundImage: "url('/in-doubt-bg.png')" }}
    >
      <h1 className="text-2xl md:text-4xl font-bold text-blue-800 text-center mb-4">
        📘 Ask Your Doubt
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-w-3xl w-full mx-auto relative">
        {messages.length === 0 && !loading && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-600 animate-pulse">
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
              msg.type === 'user'
                ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                : 'bg-white text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="p-3 rounded-xl shadow-md bg-white text-gray-600 w-fit">
            Valutide AI is thinking... 💭
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
  );
};

export default InDoubt;
