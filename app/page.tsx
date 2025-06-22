'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!showSplash && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, showSplash]);

  if (status === 'loading' || showSplash) {
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

  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Valutide</title>
          <link rel="icon" href="/valutide-logo.png" type="image/png" sizes="32x32" />
        </Head>

        {/* Profile Menu */}
        <div className="absolute top-4 right-4 z-50">
          <div className="relative">
            <img
              src={session.user?.image || '/default-profile.png'}
              alt="Profile"
              className="w-9 h-9 rounded-full cursor-pointer border-2 border-white shadow"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md text-sm">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Homepage Content */}
        <div className="min-h-screen flex flex-col items-center justify-between bg-cover bg-center px-4 py-8"
          style={{ backgroundImage: "url('/bg-money-pattern.png')" }}>
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center w-full max-w-md md:max-w-2xl mt-4">
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

          <p className="text-sm text-gray-600 mt-6 text-center">© 2025 <span className="font-semibold text-blue-600">Valutide™</span>. All rights reserved.</p>
        </div>
      </>
    );
  }

  return null;
}
