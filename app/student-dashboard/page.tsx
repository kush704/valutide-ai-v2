// app/student-dashboard/page.tsx

'use client';

import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();

  const navigateToSection = (section: string) => {
    router.push(`/student-dashboard/${section}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/student-dashboard.png')" }}
    >
      {/* Main content on top of background */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-transparent">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800 drop-shadow-md">
          Welcome to Student Dashboard 🎓
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-800 mb-8 drop-shadow-sm">
          Choose an option:
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* In Doubt Section */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 w-72">
            <button
              onClick={() => navigateToSection('in-doubt')}
              className="bg-orange-500 text-white py-4 px-6 rounded-xl text-xl w-full shadow-md transform transition duration-300 hover:scale-105"
            >
              📘 In Doubt?
            </button>
            <p className="mt-4 text-center text-gray-600 text-base sm:text-lg">
              Solve your doubts by AI
            </p>
          </div>

          {/* Checker Section */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 w-72">
            <button
              onClick={() => navigateToSection('checker')}
              className="bg-green-500 text-white py-4 px-6 rounded-xl text-xl w-full shadow-md transform transition duration-300 hover:scale-105"
            >
              🔍 Checker
            </button>
            <p className="mt-4 text-center text-gray-600 text-base sm:text-lg">
              Let’s check where you went wrong
            </p>
          </div>

          {/* Practice Section */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 w-72">
            <button
              onClick={() => navigateToSection('practice')}
              className="bg-yellow-500 text-white py-4 px-6 rounded-xl text-xl w-full shadow-md transform transition duration-300 hover:scale-105"
            >
              📝 Practice
            </button>
            <p className="mt-4 text-center text-gray-600 text-base sm:text-lg">
              Let’s practice from AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
