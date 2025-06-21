'use client';

import { useState } from 'react';

export default function PaymentVoucher() {
  const [voucherNo, setVoucherNo] = useState('1');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');

  return (
    <div className="min-h-screen bg-[#fdf8f3] p-6 font-mono text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-300 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">Accounting Voucher Creation</h1>
          <span className="text-sm text-gray-500">Voucher Type: <strong>Payment</strong></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Voucher No.</label>
            <input
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Account</label>
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              placeholder="Enter Account Name"
            />
            <p className="text-xs text-gray-500 mt-1">Current balance: ₹0.00</p>
          </div>
        </div>

        <h2 className="font-semibold text-blue-600 mb-2">Particulars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            placeholder="Amount"
            type="number"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Narration</label>
          <textarea
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            rows={3}
            placeholder="Write narration here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ✅ Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
