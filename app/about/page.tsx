'use client'

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Valutide • Valutide';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-16 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center space-y-6"
      >
        <h1 className="text-5xl font-bold">About Valutide</h1>
        <p className="text-xl text-white/70">
          Valutide is building India’s next‑generation Financial Operating System — offline‑first, GST‑ready, and AI‑native.
          We empower MSMEs, Chartered Accountants, enterprises, and students to handle tax, accounting, invoicing, and compliance effortlessly.
        </p>
        <p className="text-xl text-white/70">
          Born in Bharat, built for the world 🌏 — combining homegrown insights and global best practices.
        </p>
        <div className="flex justify-center mt-8">
          <Image src="/team-photo.png" alt="Valutide Team" width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
        <h2 className="text-3xl font-semibold mt-12">Our Mission</h2>
        <p className="text-lg text-white/80">
          To simplify finance for every business in Bharat — turning complex compliance into seamless workflows, powered by cutting-edge AI.
        </p>
        <h2 className="text-3xl font-semibold mt-8">Our Vision</h2>
        <p className="text-lg text-white/80">
          A future where every SME and CA has access to world-class finance tools, driving growth, trust, and economic transformation.
        </p>
        <Link href="/careers">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg"
          >
            Join Our Journey → Careers
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
