'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://formspree.io/f/mqabloao', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong.');
      }
    } catch {
      alert('Error submitting form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/valutide-bg.jpg')" }}
    >
      <div className="bg-white/90 p-6 rounded-xl shadow-xl w-full max-w-lg">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Thank you!</h2>
            <p className="text-gray-700">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">💬 Feedback & Suggestions</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                name="message"
                required
                placeholder="Write your feedback or suggestions here..."
                className="w-full h-32 p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <input
                type="email"
                name="email"
                placeholder="Your email (optional)"
                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white px-6 py-2 rounded-lg transition ${
                  loading ? 'opacity-50' : 'hover:bg-blue-700'
                }`}
              >
                {loading ? 'Submitting...' : '🚀 Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
