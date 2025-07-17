// app/pricing.tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  useEffect(() => {
    document.title = 'Pricing • Valutide';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center space-y-8"
      >
        <h1 className="text-5xl font-bold">Pricing? Not Yet.</h1>

        <p className="text-xl text-white/80">
          Valutide is currently in active development. While we're integrating AI, tax workflows, and offline-first capabilities, we're also carefully researching how to price it responsibly.
        </p>

        <p className="text-white/70 text-lg">
          We don’t believe in rushed pricing. We want to ensure that what we build is truly useful to the businesses, students, and accountants who trust us — and that our pricing reflects that value transparently.
        </p>

        <p className="text-white/60 text-base italic">
          “When the product is ready for the world, the price will be too.”
        </p>

        <p className="text-white/70 text-sm mt-8">
          For now, everything remains <strong className="text-white">completely free</strong> while we build, test, and learn.
        </p>
      </motion.div>
    </main>
  );
}
