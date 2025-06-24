'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showSplash, setShowSplash] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('splashShown', 'true');
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm md:max-w-lg">
          <video autoPlay muted playsInline className="w-full h-auto rounded-xl shadow-lg">
            <source src="/Kalutide.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h2 className="text-white text-center text-base sm:text-lg md:text-2xl font-semibold mt-4 px-2">
          Empowering Accounting. Enabling Dreams.
        </h2>
      </div>
    );
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Valutide 👋</h2>
        <p className="mb-6 text-gray-700">Please sign in with your Google account to continue</p>
        <button onClick={() => signIn('google')} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:scale-105 transition">
          🔐 Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Valutide</title>
        <link rel="icon" href="/valutide-logo.png" type="image/png" sizes="32x32" />
      </Head>

      {/* ✅ Homepage */}
      <div className="min-h-screen flex flex-col bg-cover bg-center px-4 py-6 relative"
        style={{ backgroundImage: "url('/bg-money-pattern.png')" }}>

        {/* ✅ User avatar + dropdown */}
        <div className="absolute top-4 right-6 z-10">
          <div className="relative">
            <Image
              src={session.user?.image || '/default-avatar.png'}
              alt="User"
              width={40}
              height={40}
              className="rounded-full cursor-pointer border-2 border-gray-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push('/settings')}
                >
                  ⚙️ Settings
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  onClick={() => signOut()}
                >
                  🔓 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Center box */}
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center w-full max-w-md md:max-w-2xl mx-auto mt-16">
          <button className="bg-yellow-400 text-black font-semibold text-lg px-6 py-2 rounded-full shadow mb-6 hover:scale-105 transition">
            WELCOME TO VALUTIDE 👋
          </button>

          <p className="text-2xl font-bold text-gray-800 mb-8">Please choose your mode:</p>
          <div className="flex flex-col gap-4 w-full px-4">
            <button onClick={() => router.push('/student-dashboard')} className="bg-red-400 text-white py-3 rounded-xl text-lg shadow hover:scale-105 transition">🎓 Student Mode</button>
            <button onClick={() => router.push('/business/select-company')} className="bg-pink-400 text-white py-3 rounded-xl text-lg shadow hover:scale-105 transition">💼 Business Mode</button>
            <button onClick={() => router.push('/commerce-ai')} className="bg-blue-400 text-white py-3 rounded-xl text-lg shadow hover:scale-105 transition">🧾 Ask Commerce AI</button>
          </div>
          <button onClick={() => router.push('/feedback')} className="bg-purple-500 text-white py-2 rounded-xl mt-6 shadow hover:scale-105 transition">💡 Feedback & Suggestions</button>

          <div className="mt-6 space-y-2 text-sm sm:text-base text-gray-700">
            <p>📘 <span className="font-medium">About Us</span>: <a href="/about-us" className="text-blue-600 hover:underline ml-1">Learn more</a></p>
            <p>🔔 <span className="font-medium">YouTube</span>: <a href="https://www.youtube.com/@valutide" target="_blank" className="text-red-600 hover:underline ml-1">youtube.com/@valutide</a></p>
            <p>📸 <span className="font-medium">Instagram</span>: <a href="https://www.instagram.com/valutide" target="_blank" className="text-pink-500 hover:underline ml-1">instagram.com/valutide</a></p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-10 text-center">© 2025 <span className="font-semibold text-blue-600">Valutide™</span>. All rights reserved.</p>
      </div>
    </>
  );
}
