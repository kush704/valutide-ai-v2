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
  "Valutide", // Later dynamically push newly created groups here
];

const allocationMethods = [
  "Not Applicable",
  "Appropriate by Qty",
  "Appropriate by Value"
];

export default function GroupCreationPage() {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [under, setUnder] = useState("Capital Account");
  const [isSubLedger, setIsSubLedger] = useState("No");
  const [netBalance, setNetBalance] = useState("No");
  const [usedForCalc, setUsedForCalc] = useState("No");
  const [allocationMethod, setAllocationMethod] = useState("Not Applicable");

  const handleSubmit = () => {
    const payload = {
      name,
      alias,
      under,
      isSubLedger,
      netBalance,
      usedForCalc,
      allocationMethod,
    };

    console.log("✅ Group Created:", payload);

    // Optional: Add name to underGroups (in actual app, update DB or context)
    alert("Group Created Successfully ✅ (Check console)");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg border border-gray-300">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Create Group - Valutide
      </h1>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Capital"
          />
        </div>

        <div>
          <Label>Alias (Optional)</Label>
          <Input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="e.g. Cap"
          />
        </div>

        <div>
          <Label>Under</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={under}
            onChange={(e) => setUnder(e.target.value)}
          >
            {underGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Group behaves like a sub-ledger</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={isSubLedger}
            onChange={(e) => setIsSubLedger(e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <Label>Net Debit/Credit Balances for Reporting</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={netBalance}
            onChange={(e) => setNetBalance(e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <Label>Used for calculation (e.g. taxes, discounts)</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={usedForCalc}
            onChange={(e) => setUsedForCalc(e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <Label>Method to allocate when used in purchase invoice</Label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={allocationMethod}
            onChange={(e) => setAllocationMethod(e.target.value)}
          >
            {allocationMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleSubmit} className="w-full mt-4">
          ➕ Create Group
        </Button>
      </div>
    </div>
  );
}
