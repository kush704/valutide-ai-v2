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

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to Valutide 👋</h1>
        <p className="text-2xl text-gray-700 mb-8">Please choose your mode:</p>

        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={() => navigateToMode('student')}
            className="bg-green-500 text-white px-8 py-4 rounded-xl text-xl shadow-md hover:scale-105 transition"
          >
            🎓 Student Mode
          </button>
          <button
            onClick={() => navigateToMode('business')}
            className="bg-blue-500 text-white px-8 py-4 rounded-xl text-xl shadow-md hover:scale-105 transition"
          >
            💼 Business Mode
          </button>
          <button
            onClick={() => navigateToMode('commerce')}
            className="bg-purple-600 text-white px-8 py-4 rounded-xl text-xl shadow-md hover:scale-105 transition"
          >
            📈 Ask Commerce AI
          </button>
        </div>
      </div>
    </>
  );
}
