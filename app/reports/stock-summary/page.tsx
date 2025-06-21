'use client';

import { useEffect, useState } from 'react';

export default function StockSummaryPage() {
  const [companyName, setCompanyName] = useState('Valutide');
  const [reportDate] = useState('For 1-Apr-25');

  useEffect(() => {
    const storedName = sessionStorage.getItem('selectedCompanyName');
    if (storedName) setCompanyName(storedName);
  }, []);

  return (
    <div className="min-h-screen bg-white font-mono text-gray-900 p-6">
      <h1 className="text-lg font-semibold border-b pb-2 mb-4">
        Stock Summary
      </h1>

      {/* Header Row */}
      <div className="flex justify-between px-2 mb-2 font-semibold text-sm">
        <span>{companyName}</span>
        <span>{reportDate}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-2 border-r">Particulars</th>
              <th className="text-right p-2 border-r">Quantity</th>
              <th className="text-right p-2 border-r">Rate</th>
              <th className="text-right p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty table rows for now, we’ll add data later dynamically */}
            <tr>
              <td className="p-2 border-t border-r"> </td>
              <td className="p-2 text-right border-t border-r"> </td>
              <td className="p-2 text-right border-t border-r"> </td>
              <td className="p-2 text-right border-t"> </td>
            </tr>
          </tbody>
          <tfoot className="bg-gray-100 border-t">
            <tr>
              <td className="p-2 font-semibold" colSpan={4}>
                Grand Total
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
