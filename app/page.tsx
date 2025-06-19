'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('splashShown', 'true');
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 5000); // show splash for 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const navigateToMode = (mode: string) => {
    if (mode === 'student') {
      router.push('/student-dashboard');
    } else if (mode === 'business') {
      router.push('/business-dashboard');
    } else if (mode === 'commerce') {
      router.push('/commerce-ai');
    }
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm md:max-w-lg">
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-auto rounded-xl shadow-lg"
          >
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

  return (
    <>
      <Head>
        <title>Valutide</title>
        <link rel="icon" href="/valutide-logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div
        className="min-h-screen flex flex-col items-center justify-between bg-cover bg-center px-4 py-8"
        style={{ backgroundImage: "url('/bg-money-pattern.png')" }}
      >
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center w-full max-w-md md:max-w-2xl">
          <button className="bg-yellow-400 text-black font-semibold text-lg px-6 py-2 rounded-full shadow mb-6 hover:scale-105 transition">
            WELCOME TO VALUTIDE 👋
          </button>

          <p className="text-2xl font-bold text-gray-800 mb-8">
            Please choose your mode:
          </p>

          <div className="flex flex-col gap-4 w-full px-4">
            <button
              onClick={() => navigateToMode('student')}
              className="bg-red-400 text-white py-3 rounded-xl text-lg shadow hover:scale-105 transition"
            >
              🎓 Student Mode
            </button>
            <button
              onClick={() => navigateToMode('business')}
              className="bg-pink-400 text-white py-3 rounded-xl text-lg shadow hover:scale-105 transition"
            >
              💼 Business Mode
            </button>
            <button
              onClick={() => navigateToMode('commerce')}
              className="bg-blue-400 text-white py-3 rounded-xl text-lg shadow hover:scale-105 transition"
            >
              🧾 Ask Commerce AI
            </button>
          </div>

          <button
            onClick={() => router.push('/feedback')}
            className="bg-purple-500 text-white py-2 rounded-xl mt-6 shadow hover:scale-105 transition"
          >
            💡 Feedback & Suggestions
          </button>

          {/* Social Links */}
          <div className="mt-6 space-y-2 text-sm sm:text-base text-gray-700">
          <p>
  📘 <span className="font-medium">About Us</span>: 
  <a
    href="/about-us"
    className="text-blue-600 hover:underline ml-1"
  >
    Learn more
  </a>
</p>

            <p>
              🔔 <span className="font-medium">Follow us on YouTube</span>: 
              <a
                href="https://www.youtube.com/@valutide"
                target="_blank"
                className="text-red-600 hover:underline ml-1"
              >
                youtube.com/@valutide
              </a>
            </p>
            <p>
              📸 <span className="font-medium">Follow us on Instagram</span>: 
              <a
                href="https://www.instagram.com/valutide"
                target="_blank"
                className="text-pink-500 hover:underline ml-1"
              >
                instagram.com/valutide
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          © 2025 <span className="font-semibold text-blue-600">Valutide™</span>. All rights reserved.
        </p>
      </div>
    </>
  );
}
