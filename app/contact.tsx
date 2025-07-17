'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch('https://formspree.io/f/xayzqkdp', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });

    if (res.ok) {
      setStatus('sent');
      form.reset();
    } else {
      alert('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-white/70 text-lg mb-12">
          Your feedback matters to us. Have a question, idea, or just want to say hi? Write to us!
        </p>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-xl shadow-lg space-y-6 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">
              Message / Feedback
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={6}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition px-6 py-3 rounded text-white font-semibold"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✅ Message Sent' : 'Send Message'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm text-white/60">
          Or email us directly at{' '}
          <a href="mailto:valutidek@gmail.com" className="underline hover:text-white">
            valutidek@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
