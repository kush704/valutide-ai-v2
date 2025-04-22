'use client'; // Mark this as a client component

import { useRouter } from 'next/navigation';
import Head from 'next/head'; // Import Head for updating the title

export default function Home() {
  const router = useRouter();

  const navigateToMode = (mode: string) => {
    if (mode === 'student') {
      router.push('/student-dashboard');
    } else if (mode === 'business') {
      router.push('/business-dashboard');
    }
  };

  return (
    <>
      {/* Set the title of the tab */}
      <Head>
        <title>Valutide</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
          Welcome to Valutide 👋
        </h1>
        <p className="text-2xl text-center text-gray-700 mb-8">
          Please choose your mode:
        </p>

        <div className="flex gap-12">
          <button
            onClick={() => navigateToMode('student')}
            className="bg-green-500 text-white p-6 rounded-lg text-2xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            🎓 Student Mode
          </button>
          <button
            onClick={() => navigateToMode('business')}
            className="bg-blue-500 text-white p-6 rounded-lg text-2xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            💼 Business Mode
          </button>
        </div>
      </div>
    </>
  );
}
