'use client';

import { useEffect, useState } from 'react';

export default function BalanceSheetPage() {
  const [companyName, setCompanyName] = useState('Valutide');
  const [reportDate] = useState('as at 1-Apr-25');

  useEffect(() => {
    const storedName = sessionStorage.getItem('selectedCompanyName');
    if (storedName) setCompanyName(storedName);
  }, []);

  return (
    <div className="min-h-screen bg-white font-mono text-gray-900 p-6">
      <h1 className="text-lg font-semibold border-b pb-2 mb-4">
        Balance Sheet
      </h1>

      <div className="flex justify-between px-2 mb-2 font-semibold">
        <span className="text-sm">Valutide</span>
        <span className="text-sm">{reportDate}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-50 border rounded-md p-4 shadow-md">
        {/* Liabilities Column */}
        <div>
          <h2 className="text-base font-semibold border-b mb-2">Liabilities</h2>
          <ul className="space-y-2 text-sm font-medium">
            <li className="bg-yellow-100 px-2 py-1 rounded">Capital Account</li>
            <li>Loans (Liability)</li>
            <li>Current Liabilities</li>
            <li>
              Profit & Loss A/c
              <ul className="pl-4 text-gray-500 text-xs">
                <li>Opening Balance</li>
                <li>Current Period</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Assets Column */}
        <div>
          <h2 className="text-base font-semibold border-b mb-2">Assets</h2>
          <ul className="space-y-2 text-sm font-medium">
            <li>Current Assets</li>
          </ul>
        </div>
      </div>

      {/* Total Bar at Bottom */}
      <div className="flex justify-between px-4 mt-6 border-t pt-2 font-semibold text-sm">
        <span>Total</span>
        <span>Total</span>
      </div>
    </div>
  );
}
