'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function CheckerPage() {
  const [image, setImage] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image || !question.trim()) {
      alert('Please upload an image and write your question.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      // Step 1: OCR extract from image
      const { data: { text: extractedAnswer } } = await Tesseract.recognize(
        image,
        'eng',
        { logger: m => console.log(m) }
      );

      console.log('Extracted Answer:', extractedAnswer);

      // Step 2: Send question + extracted answer to API
      const prompt = `
Student's Question: "${question}"

Student's Uploaded Answer (extracted from image):

"${extractedAnswer.trim()}"

Task: Check if the student's answer correctly matches the question. Clearly highlight any mistakes and give corrections if needed.
`;

      const res = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result || 'No response from AI.');
    } catch (error) {
      console.error(error);
      setResult('Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Answer Checker</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-900">Upload Notebook Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-900">Write your Question:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 font-medium"
            rows={4}
            placeholder="Write your question here..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Submit for Checking'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
            <h2 className="text-lg font-bold mb-2">Result:</h2>
            <p className="text-gray-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
