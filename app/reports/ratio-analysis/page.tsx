'use client';

import { useEffect, useState } from 'react';

export default function RatioAnalysisPage() {
  const [companyName, setCompanyName] = useState('Valutide');
  const [reportDate] = useState('For 1-Apr-25');

  useEffect(() => {
    const stored = sessionStorage.getItem('selectedCompanyName');
    if (stored) setCompanyName(stored);
  }, []);

  const leftData = [
    { label: 'Working Capital', sub: '(Current Assets - Current Liabilities)' },
    { label: 'Cash-in-Hand' },
    { label: 'Bank Accounts' },
    { label: 'Bank OD A/c' },
    { label: 'Sundry Debtors', sub: '(due till today)' },
    { label: 'Sundry Creditors', sub: '(due till today)' },
    { label: 'Sales Accounts' },
    { label: 'Purchase Accounts' },
    { label: 'Stock-in-Hand' },
    { label: 'Nett Profit' },
    {
      label: 'Wkg. Capital Turnover',
      sub: '(Sales Accounts / Working Capital)',
    },
    {
      label: 'Inventory Turnover',
      sub: '(Sales Accounts / Closing Stock)',
    },
  ];

  const rightData = [
    { label: 'Current Ratio', formula: '(Current Assets : Current Liabilities)' },
    { label: 'Quick Ratio', formula: '(Current Assets - Stock-in-Hand : Current Liabilities)' },
    { label: 'Debt/Equity Ratio', formula: '(Loans (Liability) : Capital Account + Nett Profit)' },
    { label: 'Gross Profit %' },
    { label: 'Nett Profit %' },
    { label: 'Operating Cost %', sub: '(as percentage of Sales Accounts)' },
    { label: 'Recv. Turnover in days', sub: '(payment performance of Debtors)' },
    {
      label: 'Return on Investment %',
      formula: '(Nett Profit / Capital Account + Nett Profit)',
    },
    {
      label: 'Return on Wkg. Capital %',
      formula: '(Nett Profit / Working Capital) %',
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 font-mono text-sm text-gray-900">
      <h1 className="text-lg font-semibold border-b pb-2 mb-4">Ratio Analysis</h1>

      <div className="flex justify-between mb-3">
        <span>{companyName}</span>
        <span>{reportDate}</span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <h2 className="text-base font-semibold mb-2">Principal Groups</h2>
          <ul className="border border-gray-300 rounded">
            {leftData.map((item, i) => (
              <li key={i} className="border-b p-2">
                <div className="font-medium">{item.label}</div>
                {item.sub && (
                  <div className="text-xs text-gray-500 italic">{item.sub}</div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-base font-semibold mb-2">Principal Ratios</h2>
          <ul className="border border-gray-300 rounded">
            {rightData.map((item, i) => (
              <li key={i} className="border-b p-2">
                <div className="font-medium">{item.label}</div>
                {item.formula && (
                  <div className="text-xs text-gray-500 italic">{item.formula}</div>
                )}
                {item.sub && (
                  <div className="text-xs text-gray-500 italic">{item.sub}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
