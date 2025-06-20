'use client';

import { useRouter } from 'next/navigation';

export default function SelectCompany() {
  const router = useRouter();

  const handleCreateCompany = () => {
    router.push('/business/create-company');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 font-mono text-sm text-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">🏢 Select Company - Valutide</h1>

      <div className="bg-white shadow-lg rounded-xl max-w-4xl mx-auto p-6 border border-gray-200">
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Company Data Path:</label>
          <input
            type="text"
            value="C:/Users/Public/Valutide/data"
            className="w-full px-4 py-2 border rounded mt-1 bg-slate-50 text-gray-900"
            readOnly
          />
        </div>

        <div className="mb-6">
          <p className="text-blue-700 font-semibold mb-2">📁 List of Companies</p>
          <div className="bg-slate-50 px-4 py-2 rounded border text-gray-900">
            <p className="text-sm">C:\Users\Public\Valutide\data</p>
            <p className="text-sm text-gray-500 mt-1">⬆️ Up</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCreateCompany}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            ➕ Create Company
          </button>

          <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed" disabled>
            🌐 Select Remote Company
          </button>

          <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed" disabled>
            📁 Specify Path
          </button>

          <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed" disabled>
            💽 Select From Drive
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-500 text-xs">Press <strong>C</strong> to create company</p>
      </div>
    </div>
  );
}
