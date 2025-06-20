'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CreateCompany() {
  const router = useRouter();

  const [form, setForm] = useState({
    companyDataPath: 'C:/Valutide/CompanyData',
    companyName: '',
    mailingName: '',
    address: '',
    state: '',
    country: 'India',
    pincode: '',
    telephone: '',
    mobile: '',
    fax: '',
    email: '',
    website: '',
    financialYear: '2025-04-01',
    booksFrom: '2025-04-01',
    currencySymbol: '₹',
    currencyName: 'INR',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAccept = () => {
    if (!form.companyName.trim()) {
      alert('⚠️ Please enter Company Name');
      return;
    }
    sessionStorage.setItem('selectedCompanyName', form.companyName); // ✅ Store in session
    alert('✅ Company Created!');
    router.push('/business/features');
  };

  const handleQuit = () => {
    router.push('/business/select-company');
  };

  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key.toLowerCase() === 'q') handleQuit();
      if (e.key.toLowerCase() === 'a') handleAccept();
    };
    window.addEventListener('keydown', handleShortcuts);
    return () => window.removeEventListener('keydown', handleShortcuts);
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6 text-sm font-mono text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">📘 Create Company - Valutide</h1>
      <div className="bg-white rounded-xl shadow-xl max-w-5xl mx-auto p-6 space-y-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <label key={key} className="capitalize text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:
              {key === 'address' ? (
                <textarea name={key} value={value} onChange={handleChange} className="input" rows={2} />
              ) : (
                <input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="input"
                  type={key.includes('email') ? 'email' : key.includes('date') || key.includes('From') ? 'date' : 'text'}
                />
              )}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6 text-blue-700 font-semibold">
          <button onClick={handleQuit} className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded-md">Q: Quit</button>
          <button onClick={handleAccept} className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded-md">A: Accept</button>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 6px 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-top: 4px;
          outline: none;
          background-color: #fdfdfd;
          color: #111827;
        }
        .input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 1px #0ea5e9;
        }
      `}</style>
    </div>
  );
}
