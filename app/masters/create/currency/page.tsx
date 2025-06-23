"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CurrencyPage() {
  const [step, setStep] = useState<"choose" | "create" | "alter">("choose");
  const [currencyName, setCurrencyName] = useState("₹");
  const [symbol, setSymbol] = useState("₹");

  const handleCreate = () => {
    console.log("✅ New Currency Created:", { currencyName, symbol });
    alert("✅ New Currency Created (Check Console)");
  };

  const handleAlter = () => {
    console.log("✏️ Altering Existing Currency:", { currencyName, symbol });
    alert("✏️ Currency Alteration Triggered");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {step === "choose" && (
        <Card className="w-[420px] shadow-lg border">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-3">
              Currency ₹ exists by default for the Company
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Do you want to alter Currency ₹ or create a new Currency?
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                className="w-[80px] px-2 py-1 text-sm"
                onClick={() => setStep("create")}
              >
                🪙 Create
              </Button>
              <Button
                className="w-[80px] px-2 py-1 text-sm"
                onClick={() => setStep("alter")}
              >
                ✏️ Alter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "create" && (
        <Card className="w-[440px] shadow-lg border">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              🪙 Create New Currency
            </h2>

            <div className="space-y-4">
              <div>
                <Label>Currency Name</Label>
                <Input
                  value={currencyName}
                  onChange={(e) => setCurrencyName(e.target.value)}
                  placeholder="e.g. Dollar, Yen"
                />
              </div>
              <div>
                <Label>Currency Symbol</Label>
                <Input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g. $, ¥"
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  className="w-[80px] px-2 py-1 text-sm"
                  onClick={() => setStep("choose")}
                >
                  ⬅️ Back
                </Button>
                <Button
                  className="w-[120px] px-2 py-1 text-sm"
                  onClick={handleCreate}
                >
                  ✅ Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "alter" && (
        <Card className="w-[440px] shadow-lg border">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              ✏️ Alter Currency ₹
            </h2>

            <div className="space-y-4">
              <div>
                <Label>Currency Name</Label>
                <Input
                  value={currencyName}
                  onChange={(e) => setCurrencyName(e.target.value)}
                />
              </div>
              <div>
                <Label>Currency Symbol</Label>
                <Input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  className="w-[80px] px-2 py-1 text-sm"
                  onClick={() => setStep("choose")}
                >
                  ⬅️ Back
                </Button>
                <Button
                  className="w-[120px] px-2 py-1 text-sm"
                  onClick={handleAlter}
                >
                  💾 Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
