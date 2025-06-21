// app/utilities/banking/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function BankingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 font-mono">
      <h1 className="text-xl font-bold text-center text-blue-800 mb-6">🏦 Banking — Valutide</h1>

      <div className="max-w-xl mx-auto bg-sky-50 border border-gray-300 rounded-lg shadow-md p-4">
        <h2 className="text-md font-semibold text-blue-700 border-b pb-2 mb-4">Gateway of Tally → Banking</h2>

        <div className="text-sm space-y-4">
          <div>
            <p className="font-bold text-gray-700 mb-1">RECONCILIATION</p>
            <button className="bank-btn">Banking Activities</button>
            <button className="bank-btn">Imported Bank Data</button>
          </div>

          <div>
            <p className="font-bold text-gray-700 mb-1">CHEQUE</p>
            <button className="bank-btn">Cheque Printing</button>
            <button className="bank-btn">Cheque Register</button>
            <button className="bank-btn">Post-dated Summary</button>
          </div>

          <div>
            <p className="font-bold text-gray-700 mb-1">OTHER REPORTS</p>
            <button className="bank-btn">Deposit Slip</button>
            <button className="bank-btn">Payment Advice</button>
          </div>

          <div className="mt-4">
            <button className="bank-btn bg-red-100 hover:bg-red-200" onClick={() => router.push('/business-dashboard')}>
              Quit
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bank-btn {
          display: block;
          width: 100%;
          padding: 8px 12px;
          margin-bottom: 8px;
          background-color: #f1f5f9;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: left;
          cursor: pointer;
          color: #111827;
          font-weight: 600;
        }
        .bank-btn:hover {
          background-color: #dbeafe;
        }
      `}</style>
    </div>
  );
}
