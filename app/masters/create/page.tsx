'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const masterCategories = {
  'Accounting Masters': ['Group', 'Ledger', 'Currency', 'Voucher Type'],
  'Inventory Masters': ['Stock Group', 'Stock Category', 'Stock Item', 'Unit', 'Godown'],
  'Statutory Masters': ['GST Registration', 'GST Classification'],
  'Statutory Details': ['Company GST Details', 'PAN/CIN Details'],
};

const inactiveOptions = {
  'Inactive Masters': ['Credit Limits', 'Cost Centre', 'Scenario'], // You can expand this
};

export default function MasterCreation() {
  const router = useRouter();
  const [showInactive, setShowInactive] = useState(false);

  const handleClick = (type: string) => {
    router.push(`/masters/create/${type.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-sm font-mono">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-300">
        <h1 className="text-xl font-bold text-center mb-6 text-blue-800">
          📘 Master Creation - Valutide
        </h1>

        {/* Company Options */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => router.push('/company/create')}
            className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold px-4 py-2 rounded"
          >
            🏢 Create Company
          </button>
          <button
            onClick={() => router.push('/company/change')}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold px-4 py-2 rounded"
          >
            🔄 Change Company
          </button>
          <button
            onClick={() => setShowInactive(!showInactive)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-4 py-2 rounded"
          >
            {showInactive ? '🙈 Hide Inactive' : '👁️ Show Inactive'}
          </button>
        </div>

        {/* Active Masters */}
        {Object.entries(masterCategories).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h2 className="font-bold text-blue-700 mb-2">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <button
                  key={item}
                  onClick={() => handleClick(item)}
                  className="bg-white border border-gray-300 hover:border-blue-400 shadow-sm rounded-lg px-4 py-2 text-gray-800 text-sm hover:bg-blue-50 transition font-semibold"
                >
                  ➕ {item}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Inactive Masters */}
        {showInactive && Object.entries(inactiveOptions).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h2 className="font-bold text-gray-500 mb-2">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <button
                  key={item}
                  onClick={() => handleClick(item)}
                  className="bg-gray-100 border border-gray-300 hover:border-blue-400 shadow-sm rounded-lg px-4 py-2 text-gray-600 text-sm hover:bg-blue-50 transition font-semibold"
                >
                  💤 {item}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/business-dashboard')}
            className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-md"
          >
            ⬅️ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
