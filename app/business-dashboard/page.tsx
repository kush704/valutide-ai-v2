'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BusinessDashboard() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [financialYear, setFinancialYear] = useState('1-Apr-25 to 31-Mar-26');
  const [currentDate, setCurrentDate] = useState('Tuesday, 1-Apr-2025');

  useEffect(() => {
    const name = sessionStorage.getItem('selectedCompanyName') || 'Valutide';
    setCompanyName(name);
  }, []);

  return (
    <div className="min-h-screen bg-sky-50 font-mono text-gray-800 p-4">
      <h1 className="text-center text-xl font-bold text-blue-800 mb-4">📘 Gateway of Valutide</h1>

      <div className="flex flex-col sm:flex-row justify-between bg-white rounded-lg shadow-xl p-6 mb-6">
        <div className="text-sm space-y-2">
          <p><strong>Current Period:</strong> {financialYear}</p>
          <p><strong>Name of Company:</strong> {companyName}</p>
        </div>
        <div className="text-sm text-right space-y-2">
          <p><strong>Current Date:</strong> {currentDate}</p>
          <p><strong>Date of Last Entry:</strong> No Vouchers Entered</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl border shadow-md p-6">
        <h2 className="text-center font-semibold text-blue-600 border-b pb-2 mb-4">Gateway of Valutide</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-900 font-medium">
          {/* Masters */}
          <div>
            <p className="text-blue-700 font-semibold mb-1">MASTERS</p>
            <button className="dashboard-btn" onClick={() => router.push('/masters/create')}>Create</button>
            <button className="dashboard-btn">Alter</button>
            <button className="dashboard-btn">Chart of Accounts</button>
          </div>

          {/* Transactions */}
          <div>
            <p className="text-blue-700 font-semibold mb-1">TRANSACTIONS</p>
            <button className="dashboard-btn">Vouchers</button>
            <button className="dashboard-btn">Day Book</button>
          </div>

          {/* Utilities */}
          <div>
            <p className="text-blue-700 font-semibold mb-1">UTILITIES</p>
            <button className="dashboard-btn">Banking</button>
          </div>

          {/* Reports */}
          <div>
            <p className="text-blue-700 font-semibold mb-1">REPORTS</p>
            <button className="dashboard-btn">Balance Sheet</button>
            <button className="dashboard-btn">Profit & Loss A/c</button>
            <button className="dashboard-btn">Stock Summary</button>
            <button className="dashboard-btn">Ratio Analysis</button>
          </div>

          {/* More */}
          <div>
            <p className="text-blue-700 font-semibold mb-1">MORE</p>
            <button className="dashboard-btn">Display More Reports</button>
            <button className="dashboard-btn">Dashboard</button>
          </div>

          {/* Quit */}
          <div>
            <p className="text-blue-700 font-semibold mb-1">EXIT</p>
            <button className="dashboard-btn bg-red-100 hover:bg-red-200" onClick={() => router.push('/')}>Quit</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-btn {
          display: block;
          width: 100%;
          background-color: #f1f5f9;
          border: 1px solid #ccc;
          padding: 6px 10px;
          border-radius: 4px;
          margin-bottom: 8px;
          text-align: left;
          cursor: pointer;
          color: #111827;        /* darker text */
          font-weight: 600;      /* bolder text */
        }
        .dashboard-btn:hover {
          background-color: #dbeafe;
        }
      `}</style>
    </div>
  );
}
