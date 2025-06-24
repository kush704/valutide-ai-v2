'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SelectCompany() {
  const router = useRouter();

  useEffect(() => {
    const companies = localStorage.getItem('companies');
    if (companies) {
      const parsed = JSON.parse(companies);
      const activeCompany = parsed.find((c: any) => !c.shut);
      if (activeCompany) {
        sessionStorage.setItem('selectedCompanyName', activeCompany.name);
        localStorage.setItem('selectedCompanyId', activeCompany.id);
        router.push('/business-dashboard');
      }
    }
  }, []);

  const handleCreateCompany = () => router.push('/business/create-company');
  const handleRemoteCompany = () => alert('Remote Company Selection - Coming Soon!');
  const handleSpecifyPath = () => alert('Specify Path - Coming Soon!');
  const handleSelectFromDrive = () => alert('Drive Selection - Coming Soon!');

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 font-mono text-sm text-gray-900">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-8">
        🏢 Select Company - Valutide
      </h1>

      <div className="bg-white shadow-lg rounded-xl max-w-4xl mx-auto p-6 border border-gray-200 space-y-6">

        {/* Company Path */}
        <div>
          <label className="font-semibold text-gray-700">Company Data Path:</label>
          <input
            type="text"
            value="C:/Users/Public/Valutide/data"
            className="w-full px-4 py-2 border rounded mt-1 bg-slate-50 text-gray-900"
            readOnly
          />
        </div>

        {/* List of Companies */}
        <div>
          <p className="font-semibold text-blue-700 mb-1">📁 List of Companies</p>
          <div className="border p-3 rounded bg-gray-50 text-gray-700">
            C:\Users\Public\Valutide\data
            <br />
            <button className="mt-2 text-blue-600 hover:underline">⬆️ Up</button>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <button onClick={handleCreateCompany} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold">
            ➕ Create Company
          </button>
          <button onClick={handleRemoteCompany} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold">
            🌐 Select Remote Company
          </button>
          <button onClick={handleSpecifyPath} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-semibold">
            📁 Specify Path
          </button>
          <button onClick={handleSelectFromDrive} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded font-semibold">
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
