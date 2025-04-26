'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  const navigateToMode = (mode: string) => {
    if (mode === 'student') {
      router.push('/student-dashboard');
    } else if (mode === 'business') {
      router.push('/business-dashboard');
    } else if (mode === 'commerce') {
      router.push('/commerce-ai');
    }
  };

  return (
    <>
      <Head>
        <title>Valutide</title>
      </Head>

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
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
        </div>
      </div>
    </>
  );
}
