'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const booleanOptions = ["Yes", "No"];

export default function VoucherTypeCreation() {
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');

  const [activate, setActivate] = useState("Yes");
  const [method, setMethod] = useState("");
  const [retainOriginal, setRetainOriginal] = useState("Yes");
  const [showUnused, setShowUnused] = useState("");

  const [effectiveDates, setEffectiveDates] = useState("No");
  const [zeroValued, setZeroValued] = useState("No");
  const [optionalByDefault, setOptionalByDefault] = useState("No");
  const [allowNarration, setAllowNarration] = useState("Yes");
  const [narrationEachLedger, setNarrationEachLedger] = useState("No");

  const [printAfterSaving, setPrintAfterSaving] = useState("No");
  const [whatsappVoucher, setWhatsappVoucher] = useState("No");

  const handleSubmit = () => {
    const payload = {
      name,
      alias,
      activate,
      method,
      retainOriginal,
      showUnused,
      effectiveDates,
      zeroValued,
      optionalByDefault,
      allowNarration,
      narrationEachLedger,
      printAfterSaving,
      whatsappVoucher
    };

    console.log("✅ Voucher Type Created:", payload);
    alert("✅ Voucher Type Created (Check Console)");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl border border-gray-300">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">🧾 Create Voucher Type - Valutide</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sales" />
        </div>

        <div>
          <Label>Alias (Optional)</Label>
          <Input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Alias name" />
        </div>

        <div>
          <Label>Activate this Voucher Type</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={activate}
            onChange={(e) => setActivate(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Method of Voucher Numbering</Label>
          <Input
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g. Automatic, Manual"
          />
        </div>

        <div>
          <Label>Show Unused Voucher Numbers</Label>
          <Input
            value={showUnused}
            onChange={(e) => setShowUnused(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div>
          <Label>Retain Original Voucher No.</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={retainOriginal}
            onChange={(e) => setRetainOriginal(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Use Effective Dates for Vouchers</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={effectiveDates}
            onChange={(e) => setEffectiveDates(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Allow Zero-valued Transactions</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={zeroValued}
            onChange={(e) => setZeroValued(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Make Optional by Default</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={optionalByDefault}
            onChange={(e) => setOptionalByDefault(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Allow Narration in Voucher</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={allowNarration}
            onChange={(e) => setAllowNarration(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Provide Narration for Each Ledger</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={narrationEachLedger}
            onChange={(e) => setNarrationEachLedger(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>Print Voucher After Saving</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={printAfterSaving}
            onChange={(e) => setPrintAfterSaving(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <Label>WhatsApp Voucher After Saving</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={whatsappVoucher}
            onChange={(e) => setWhatsappVoucher(e.target.value)}
          >
            {booleanOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full mt-8">
        ➕ Create Voucher Type
      </Button>
    </div>
  );
}
