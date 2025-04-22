'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

const InDoubt = () => {
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse('');

    let finalQuery = userQuery;

    // If image is uploaded, extract text using OCR
    if (imageFile) {
      const ocrResult = await Tesseract.recognize(imageFile, 'eng');
      finalQuery = ocrResult.data.text.trim();
      setUserQuery(finalQuery); // Show extracted text in textarea
    }

    const response = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalQuery }),
    });

    const data = await response.json();
    setAiResponse(data.response);
    setLoading(false);
    setImageFile(null); // Reset image
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">📘 Ask Your Doubt</h1>

      <form onSubmit={handleQuerySubmit} className="w-full max-w-2xl space-y-4">
        <textarea
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Type your question here..."
          rows={5}
          className="w-full p-4 rounded-xl bg-gray-800 text-white text-lg shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Or upload a question image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {loading && (
        <div className="mt-6 p-4 bg-white shadow rounded-xl text-gray-600">
          Loading AI Response...
        </div>
      )}

      {aiResponse && !loading && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-green-600 mb-2">AI Answer:</h2>
          <p className="text-gray-800 whitespace-pre-line">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default InDoubt;
