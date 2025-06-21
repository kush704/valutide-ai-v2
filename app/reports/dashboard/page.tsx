'use client';

import { useEffect, useState } from 'react';

export default function ReportDashboard() {
  const [companyName, setCompanyName] = useState('Valutide');

  useEffect(() => {
    const stored = sessionStorage.getItem('selectedCompanyName');
    if (stored) setCompanyName(stored);
  }, []);

  const metrics = [
    { label: 'Total Sales', value: '₹0' },
    { label: 'Total Purchases', value: '₹0' },
    { label: 'Cash in Hand', value: '₹0' },
    { label: 'Bank Balance', value: '₹0' },
    { label: 'Receivables', value: '₹0' },
    { label: 'Payables', value: '₹0' },
  ];

  const quickLinks = [
    'Profit & Loss',
    'Balance Sheet',
    'Ratio Analysis',
    'Stock Summary',
    'Day Book',
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-5 font-mono text-sm">
      <h1 className="text-lg font-semibold mb-4">📊 Dashboard - {companyName}</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-blue-50 p-4 rounded border border-blue-200 shadow-sm"
          >
            <p className="text-gray-500">{metric.label}</p>
            <h2 className="text-lg font-semibold text-blue-700">{metric.value}</h2>
          </div>
        ))}
      </div>

      {/* Graph Placeholder */}
      <div className="mb-8">
        <h2 className="text-md font-semibold mb-2">📈 Sales vs Purchases</h2>
        <div className="bg-gray-100 h-48 flex items-center justify-center rounded border text-gray-500 italic">
          (Graph Component will appear here)
        </div>
      </div>

      {/* Quick Report Links */}
      <h2 className="text-md font-semibold mb-2">🧾 Quick Reports</h2>
      <ul className="list-disc ml-6 space-y-1">
        {quickLinks.map((link, i) => (
          <li key={i} className="text-blue-700 hover:underline cursor-pointer">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
