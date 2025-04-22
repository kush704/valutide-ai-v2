// app/student-dashboard/page.tsx

'use client';

import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();

  // Function to navigate to different sections
  const navigateToSection = (section: string) => {
    if (section === 'in-doubt') {
      router.push('/student-dashboard/in-doubt');
    } else if (section === 'checker') {
      router.push('/student-dashboard/checker');
    } else if (section === 'practice') {
      router.push('/student-dashboard/practice');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
        Welcome to Student Dashboard 🎓
      </h1>
      <p className="text-2xl text-center text-gray-700 mb-8">
        Choose an option:
      </p>

      <div className="flex gap-12 mb-12">
        {/* In Doubt Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigateToSection('in-doubt')}
            className="bg-orange-500 text-white p-6 rounded-lg text-2xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            📘 In Doubt?
          </button>
          <p className="mt-4 text-lg text-center text-gray-600">
            Solve your doubts by AI
          </p>
        </div>

        {/* Checker Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigateToSection('checker')}
            className="bg-green-500 text-white p-6 rounded-lg text-2xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            🔍 Checker
          </button>
          <p className="mt-4 text-lg text-center text-gray-600">
            Let’s check where you went wrong
          </p>
        </div>

        {/* Practice Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigateToSection('practice')}
            className="bg-yellow-500 text-white p-6 rounded-lg text-2xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            📝 Practice
          </button>
          <p className="mt-4 text-lg text-center text-gray-600">
            Let’s practice from AI
          </p>
        </div>
      </div>
    </div>
  );
}
