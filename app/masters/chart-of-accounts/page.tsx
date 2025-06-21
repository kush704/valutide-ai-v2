'use client';

import { useRouter } from 'next/navigation';

export default function ChartOfAccounts() {
  const router = useRouter();

  const accountingMasters = [
    { label: 'Groups', path: '/masters/chart-of-accounts/groups' },
    { label: 'Ledgers', path: '/masters/chart-of-accounts/ledgers' },
    { label: 'Voucher Types', path: '/masters/chart-of-accounts/voucher-types' },
    { label: 'Currencies', path: '/masters/chart-of-accounts/currencies' },
    { label: 'Budgets', path: '/masters/chart-of-accounts/budgets' },
    { label: 'Scenarios', path: '/masters/chart-of-accounts/scenarios' },
  ];

  const inventoryMasters = [
    { label: 'Stock Groups', path: '/masters/chart-of-accounts/stock-groups' },
    { label: 'Stock Items', path: '/masters/chart-of-accounts/stock-items' },
    { label: 'Stock Categories', path: '/masters/chart-of-accounts/stock-categories' },
    { label: 'Units', path: '/masters/chart-of-accounts/units' },
    { label: 'Godowns', path: '/masters/chart-of-accounts/godowns' },
  ];

  return (
    <div className="min-h-screen bg-sky-50 p-6 font-mono text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg border p-6">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          📘 Chart of Accounts - Valutide
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Accounting Masters */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-3">📒 Accounting Masters</h2>
            <ul className="space-y-2">
              {accountingMasters.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => router.push(item.path)}
                    className="w-full text-left px-4 py-2 bg-slate-100 rounded hover:bg-slate-200 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Inventory Masters */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-3">📦 Inventory Masters</h2>
            <ul className="space-y-2">
              {inventoryMasters.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => router.push(item.path)}
                    className="w-full text-left px-4 py-2 bg-slate-100 rounded hover:bg-slate-200 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="bg-red-200 text-red-800 px-4 py-2 rounded hover:bg-red-300"
          >
            🔙 Back
          </button>
        </div>
      </div>
    </div>
  );
}
