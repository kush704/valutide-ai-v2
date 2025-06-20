'use client';

import { useRouter } from 'next/navigation';

export default function BusinessDashboard() {
  const router = useRouter();

  const handleClick = (section: string) => {
    router.push(`/business-dashboard/${section}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/business-bg.jpg')" }}
    >
      <h1 className="text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Welcome to Valutide™ Business Mode
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Upload Invoice */}
        <div
          onClick={() => handleClick('upload-invoice')}
          className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 cursor-pointer transition"
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-600">📤 Upload Invoice</h2>
          <p className="text-gray-700">Generate Journal Entries automatically from scanned invoices.</p>
        </div>

        {/* P&L Statement */}
        <div
          onClick={() => handleClick('profit-loss')}
          className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 cursor-pointer transition"
        >
          <h2 className="text-2xl font-bold mb-2 text-green-600">📊 Profit & Loss</h2>
          <p className="text-gray-700">View sample report (for MVP demo).</p>
        </div>

        {/* Export to Excel */}
        <div
          onClick={() => handleClick('export')}
          className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 cursor-pointer transition"
        >
          <h2 className="text-2xl font-bold mb-2 text-purple-600">📁 Export to Excel</h2>
          <p className="text-gray-700">Download entries as Excel sheet.</p>
        </div>
      </div>
    </div>
  );
}
