'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

const InDoubt = () => {
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { type: 'user' | 'ai'; content: string; image?: string }[]
  >([]);
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

    // 👇 Show user message once
    setChatHistory((prev) => [...prev, { type: 'user', content: finalQuery }]);
    setUserQuery('');
    setImageFile(null);

    const response = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalQuery }),
    });

    const data = await response.json();

    // 👇 Only add AI response here
    setChatHistory((prev) => [
      ...prev,
      { type: 'ai', content: data.response, image: data.image },
    ]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">📘 Ask Your Doubt</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`max-w-3xl mx-auto p-4 rounded-xl shadow ${
              msg.type === 'user'
                ? 'bg-blue-100 self-end text-right'
                : 'bg-white self-start text-left'
            }`}
          >
            <p className="text-gray-800 whitespace-pre-line">{msg.content}</p>
            {msg.image && (
              <img
                src={msg.image}
                alt="AI provided"
                className="mt-3 rounded-md border shadow-md w-full"
              />
            )}
          </div>
        ))}
        {loading && (
          <div className="text-gray-600 italic max-w-3xl mx-auto">
            Loading AI response...
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleQuerySubmit} className="bg-white border-t px-4 py-3 shadow-inner">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {/* Upload Icon */}
          <label className="cursor-pointer text-gray-600 hover:text-blue-500 text-2xl">
            ➕
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

          {/* Input */}
          <input
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type your question here..."
            className="flex-grow rounded-full px-4 py-2 bg-gray-100 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg flex items-center justify-center"
            title="Send"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};

export default InDoubt;
