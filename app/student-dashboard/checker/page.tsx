// app/student-dashboard/checker/page.tsx

export default function Checker() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Check Your Answer 🔍
        </h1>
        <textarea
          placeholder="Paste your answer here..."
          className="p-4 border rounded-lg mb-4 w-96"
        />
        <button className="bg-blue-500 text-white p-3 rounded-lg">Check Answer</button>
      </div>
    );
  }
  