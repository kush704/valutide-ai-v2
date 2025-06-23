'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/valutide-login-bg.jpg')" }}>
      <div className="bg-white/90 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Sign in to Valutide
        </h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
