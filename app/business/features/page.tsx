'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the structure of all features
type FeatureSections =
  | 'accounting'
  | 'inventory'
  | 'taxation'
  | 'online'
  | 'payroll'
  | 'others';

type FeatureSet = {
  [key in FeatureSections]: { [label: string]: string };
};

const defaultFeatures: FeatureSet = {
  accounting: {
    'Maintain Accounts': 'Yes',
    'Enable Bill-wise entry': 'Yes',
    'Enable Cost Centres': 'Yes',
    'Enable Interest Calculation': 'No',
  },
  inventory: {
    'Maintain Inventory': 'Yes',
    'Integrate Accounts with Inventory': 'Yes',
    'Enable multiple Price Levels': 'No',
    'Enable Batches': 'No',
    'Maintain Expiry Date for Batches': 'No',
    'Enable Job Order Processing': 'No',
    'Enable Cost Tracking': 'No',
    'Enable Job Costing': 'No',
    'Use Discount column in invoices': 'No',
    'Use separate Actual and Billed Quantity columns in invoices': 'No',
  },
  taxation: {
    'Enable Goods and Services Tax (GST)': 'Yes',
    'Set/Alter Company GST Rate and Other Details': 'No',
    'Enable Tax Deducted at Source (TDS)': 'No',
    'Enable Tax Collected at Source (TCS)': 'No',
    'Enable Value Added Tax (VAT)': 'No',
    'Enable Excise': 'No',
    'Enable Service Tax': 'No',
  },
  online: {
    'Enable Browser Access for Reports': 'Yes',
    'Enable Valutide.NET Services for Remote Access & Synchronisation': 'No',
  },
  payroll: {
    'Maintain Payroll': 'No',
    'Enable Payroll Statutory': 'No',
  },
  others: {
    'Enable Payment Request to share payment link/QR code': 'No',
    'Enable multiple addresses': 'No',
    'Mark modified vouchers': 'No',
  },
};

export default function CompanyFeatures() {
  const router = useRouter();
  const [features, setFeatures] = useState<FeatureSet>(defaultFeatures);
  const [companyName, setCompanyName] = useState('Loading...');

  const handleChange = (section: FeatureSections, feature: string, value: string) => {
    setFeatures((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [feature]: value,
      },
    }));
  };

  const handleAccept = () => {
    alert('✅ Company features saved! (in-memory only)');
    router.push('/business-dashboard');
  };

  const handleQuit = () => {
    router.push('/business-dashboard');
  };

  useEffect(() => {
    const name = sessionStorage.getItem('selectedCompanyName');
    setCompanyName(name || 'Unnamed Company');
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea') return;

      if (e.key.toLowerCase() === 'q') handleQuit();
      if (e.key.toLowerCase() === 'a') handleAccept();
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-sm font-mono text-gray-900">
      <h1 className="text-xl font-bold text-center mb-4">📘 Company Features - {companyName}</h1>

      <div className="bg-white shadow-xl rounded-xl border border-gray-300 max-w-6xl mx-auto p-6 space-y-6">
        <div className="text-base font-medium">
          Company: <span className="font-semibold text-blue-600">{companyName}</span>
        </div>

        {Object.entries(features).map(([section, options]) => (
          <div key={section}>
            <h2 className="text-md font-bold text-blue-800 capitalize border-b pb-1 mb-3">{section}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(options).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <label className="text-gray-700 mr-4">{label}</label>
                  <select
                    value={value}
                    onChange={(e) => handleChange(section as FeatureSections, label, e.target.value)}
                    className="border rounded px-3 py-1 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-8 text-sm font-semibold text-blue-700">
          <button
            onClick={handleQuit}
            className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded-md"
          >
            Q: Quit
          </button>
          <button
            onClick={handleAccept}
            className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded-md"
          >
            A: Accept
          </button>
        </div>
      </div>
    </div>
  );
}
