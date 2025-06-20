'use client';

import { useState } from 'react';

export default function CommerceAIPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const res = await fetch('/api/ask-anything', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });
    const data = await res.json();
    setResponse(data.answer);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/commerce-bg.png')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 text-center">
          📈 Ask Commerce AI
        </h1>
        <p className="text-gray-700 text-lg mb-6 text-center">
          Ask anything about 📊 finance, 🧾 taxation, 🏛️ laws, 💼 business or 📉 economics!
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-4 rounded-md border border-gray-300 shadow-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ex: What is the latest GST rate for restaurants?"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
        >
          {loading ? 'Thinking...' : '🔍 Get Answer'}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-white rounded-md shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">📘 AI Answer:</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
