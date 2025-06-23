'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const underGroups = [
  "Capital Account",
  "Bank Accounts",
  "Cash-in-Hand",
  "Current Assets",
  "Current Liabilities",
  "Direct Expenses",
  "Indirect Expenses",
  "Direct Incomes",
  "Indirect Incomes",
  "Loans (Liability)",
  "Loans & Advances (Asset)",
  "Sales Accounts",
  "Purchase Accounts",
  "Sundry Debtors",
  "Sundry Creditors",
  "Fixed Assets",
  "Investments",
  "Valutide",
];

export default function LedgerCreationPage() {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [under, setUnder] = useState("Capital Account");

  const [address, setAddress] = useState("");
  const [state, setState] = useState("Not Applicable");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");

  const [bankDetails, setBankDetails] = useState("No");

  const [pan, setPan] = useState("");
  const [regType, setRegType] = useState("Regular");
  const [gstin, setGstin] = useState("");
  const [additionalGst, setAdditionalGst] = useState("No");

  const handleSubmit = () => {
    const payload = {
      name,
      alias,
      under,
      mailing: {
        address,
        state,
        country,
        pincode,
      },
      banking: bankDetails,
      tax: {
        pan,
        regType,
        gstin,
        additionalGst,
      },
    };
    console.log("✅ Ledger Created:", payload);
    alert("✅ Ledger Created (Check Console)");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl border border-gray-300">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">📒 Create Ledger - Valutide</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ledger Info */}
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Valutide" />
        </div>

        <div>
          <Label>Alias (Optional)</Label>
          <Input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Alias name" />
        </div>

        <div>
          <Label>Under</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={under}
            onChange={(e) => setUnder(e.target.value)}
          >
            {underGroups.map(group => (
              <option key={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Mailing Details */}
        <div className="col-span-2 mt-4">
          <h2 className="font-semibold text-lg text-blue-700 mb-2">📮 Mailing Details</h2>
        </div>

        <div>
          <Label>Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div>
          <Label>State</Label>
          <Input value={state} onChange={(e) => setState(e.target.value)} />
        </div>

        <div>
          <Label>Country</Label>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>

        <div>
          <Label>Pincode</Label>
          <Input value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </div>

        {/* Banking Details */}
        <div className="col-span-2 mt-4">
          <h2 className="font-semibold text-lg text-blue-700 mb-2">🏦 Banking Details</h2>
        </div>

        <div>
          <Label>Provide Bank Details</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Tax Registration Details */}
        <div className="col-span-2 mt-4">
          <h2 className="font-semibold text-lg text-blue-700 mb-2">🧾 Tax Registration Details</h2>
        </div>

        <div>
          <Label>PAN/IT No.</Label>
          <Input value={pan} onChange={(e) => setPan(e.target.value)} />
        </div>

        <div>
          <Label>Registration Type</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={regType}
            onChange={(e) => setRegType(e.target.value)}
          >
            <option>Regular</option>
            <option>Composition</option>
            <option>Unregistered</option>
          </select>
        </div>

        <div>
          <Label>GSTIN/UIN</Label>
          <Input value={gstin} onChange={(e) => setGstin(e.target.value)} />
        </div>

        <div>
          <Label>Set/Alter Additional GST Details</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={additionalGst}
            onChange={(e) => setAdditionalGst(e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full mt-8">
        ➕ Create Ledger
      </Button>
    </div>
  );
}
