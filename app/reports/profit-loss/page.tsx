'use client';

import { useEffect, useState } from 'react';

export default function ProfitLossPage() {
  const [companyName, setCompanyName] = useState('Valutide');
  const [reportDate] = useState('For 1-Apr-25');

  useEffect(() => {
    const storedName = sessionStorage.getItem('selectedCompanyName');
    if (storedName) setCompanyName(storedName);
  }, []);

  return (
    <div className="min-h-screen bg-white font-mono text-gray-900 p-6">
      <h1 className="text-lg font-semibold border-b pb-2 mb-4">
        Profit & Loss A/c
      </h1>

      <div className="flex justify-between px-2 mb-2 font-semibold text-sm">
        <span>{companyName}</span>
        <span>{reportDate}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-50 border rounded-md p-4 shadow-md">
        {/* Left Column - Particulars */}
        <div>
          <h2 className="text-base font-semibold border-b mb-2">Particulars</h2>
          <ul className="space-y-2 text-sm font-medium">
            <li className="bg-yellow-100 px-2 py-1 rounded">Net Profit</li>
          </ul>
        </div>

        {/* Right Column - Particulars */}
        <div>
          <h2 className="text-base font-semibold border-b mb-2">Particulars</h2>
          <ul className="space-y-2 text-sm font-medium">
            {/* Empty for now */}
          </ul>
        </div>
      </div>

      {/* Bottom Total Row */}
      <div className="flex justify-between px-4 mt-6 border-t pt-2 font-semibold text-sm">
        <span>Total</span>
        <span>Total</span>
      </div>
    </div>
  );
}
