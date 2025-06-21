// app/transactions/daybook/page.tsx
'use client';

export default function DayBookPage() {
  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 font-mono">
      <h1 className="text-lg font-bold text-center text-blue-900 mb-6">📘 Day Book — Valutide</h1>

      <div className="bg-sky-50 border border-gray-300 rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Particulars</th>
              <th className="border px-4 py-2">Vch Type</th>
              <th className="border px-4 py-2">Vch No.</th>
              <th className="border px-4 py-2">Debit Amount</th>
              <th className="border px-4 py-2">Credit Amount</th>
              <th className="border px-4 py-2">Inwards Qty</th>
              <th className="border px-4 py-2">Outwards Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-600 text-center">
              <td className="border px-4 py-2">-</td>
              <td className="border px-4 py-2" colSpan={7}>No Vouchers Found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-xs text-gray-500">
        <p className="mb-2">🔘 Keyboard Shortcuts:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <p>Q: Quit</p>
          <p>Enter: Alter</p>
          <p>A: Add Vch</p>
          <p>I: Insert Vch</p>
          <p>D: Delete</p>
          <p>X: Cancel Vch</p>
          <p>R: Remove Line</p>
          <p>U: Restore Line</p>
        </div>
      </div>
    </div>
  );
}
