'use client';

import { useEffect, useState, useRef } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { mockData } from './data/mock';
import './globals.css';

type FloatingCoin = {
  x: number;
  y: number;
  delay: number;
  duration: number;
};

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showSplash, setShowSplash] = useState(true);
  const [fakeUsers, setFakeUsers] = useState(1421000);
  const heroRef = useRef<HTMLDivElement>(null);
  const coinsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) setShowSplash(false);
    else {
      sessionStorage.setItem('splashShown', 'true');
      const timer = setTimeout(() => setShowSplash(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFakeUsers(prev => prev + Math.floor(Math.random() * 3));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroRef.current)
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      if (coinsRef.current)
        coinsRef.current.style.transform = `translateY(${scrollY * 0.3}px) rotateZ(${scrollY * 0.1}deg)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <video autoPlay muted playsInline className="w-full max-w-xl h-auto rounded-xl shadow-xl">
          <source src="/Kalutide.mp4" type="video/mp4" />
        </video>
        <h2 className="text-white text-center text-2xl mt-4 font-semibold">
          Empowering Accounting. Enabling Dreams.
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/valutide-logo.png" alt="Valutide Logo" width={32} height={32} />
            <span className="text-xl font-bold text-white">Valutide Inc.</span>
          </div>
          <nav className="hidden md:flex gap-12 text-white/80 items-center">
  <div className="relative group">
    <div className="cursor-pointer px-2 py-1">Products</div>
    <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <a href="/student-dashboard" className="block px-4 py-2 hover:bg-gray-100">Student Mode</a>
      <a href="/student-dashboard/in-doubt" className="block px-4 py-2 hover:bg-gray-100">InDoubt.AI</a>
      <a href="/student-dashboard/checker" className="block px-4 py-2 hover:bg-gray-100">Checker.AI</a>
    </div>
  </div>
  <a href="#features" className="hover:text-white">Features</a>
  <a href="#demo" className="hover:text-white">Demo</a>
  <a href="/pricing" className="hover:text-white font-semibold">Pricing</a> {/* 👈 New Line */}
  <a href="#ai" className="hover:text-white">ValuAI</a>
  <a href="#signup" className="hover:text-white">Early Access</a>
</nav>

          <div>
            {!session ? (
              <button onClick={() => signIn('google')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow transition">
                Sign In
              </button>
            ) : (
              <button onClick={() => signOut()} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-md shadow transition">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div ref={heroRef} className="text-center z-10 max-w-4xl">
          <div className="mb-4 text-white/80">🇮🇳 Made from Bharat. Built for the World.</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Accounting meets AI.<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              For MSMEs, CAs, Enterprises & Students.
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            India’s next Financial Operating System — Offline-first, GST-ready & AI-native.
          </p>
          <button
            onClick={() => router.push('/valucount-landing')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded text-lg text-white hover:scale-105 transition"
          >
            <Sparkles className="inline-block mr-2 w-5 h-5" />
            Coming Soon: ValuCount
          </button>
        <div className="mt-8">
  <p className="text-xl text-white/80 mb-4">
    Or try our latest launch: <span className="text-purple-300 font-semibold">ValuCommerce AI</span> —
    the world’s most advanced commerce agent.
  </p>
  <button
    onClick={() => window.open('https://valucommerce.vercel.app', '_blank')}
    className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-md text-white font-semibold text-lg shadow-md hover:scale-105 transition"
  >
    🚀 Try Now
  </button>
</div>

        
        
        
        
        
        
        
        
        
        
        
        </div>
        <div ref={coinsRef} className="absolute inset-0 pointer-events-none">
          {mockData.floatingCoins.map((coin, idx) => (
            <div
              key={idx}
              className="absolute animate-bounce"
              style={{
                left: `${coin.x}%`,
                top: `${coin.y}%`,
                animationDelay: `${coin.delay}s`,
                animationDuration: `${coin.duration}s`,
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
                ₹
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Features that <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">revolutionize</span> finance
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-3xl mx-auto">
          Everything you need to manage your business finances, powered by cutting-edge AI technology.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Offline-first ledger', desc: 'Work seamlessly without internet. All your data syncs automatically when you’re back online.', icon: '📶' },
            { title: 'AI narration & voucher detection', desc: 'Smart AI that understands your business language and auto‑categorizes transactions.', icon: '🧠' },
            { title: 'GST-ready reports', desc: 'Generate GST-compliant reports instantly. No more manual calculations or formatting.', icon: '📄' },
            { title: 'Built‑in e‑invoicing engine', desc: 'Create, send, and track invoices directly from the platform. Fully compliant with Indian regulations.', icon: '🧾' },
            { title: 'Vernacular UX', desc: 'Hindi, Gujarati, Tamil coming soon. Experience finance in your native language.', icon: '🌐' },
            { title: 'Real‑time analytics', desc: 'Get instant insights into your business performance with beautiful, actionable dashboards.', icon: '📊' },
          ].map((f, idx) => (
            <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10 shadow hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interface Demo */}
      <section id="demo" className="mt-28 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Experience the Interface</h2>
        <p className="text-white/60 text-lg mb-12">
          Clean, intuitive, and powerful – designed for the modern Indian business owner.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { title: 'Welcome to ValuCount', image: '/welcome-valucount.png' },
            { title: 'Gateway to ValuCount', image: '/gateway-valucount.png' },
            { title: 'Company Features', image: '/company-features.png' },
            { title: 'Master Creation', image: '/master-creation.png' },
            { title: 'Group Creation', image: '/group-creation.png' },
            { title: 'Ledger Creation', image: '/ledger-creation.png' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-md">
              <Image src={item.image} alt={item.title} width={600} height={400} className="w-full h-auto object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet ValuAI */}
      <section id="ai" className="mt-24 px-6 flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
        <div className="flex-1">
          <p className="text-sm bg-purple-700 inline-block px-3 py-1 rounded-full mb-3">AI-Powered</p>
          <h2 className="text-4xl font-bold mb-4">Meet <span className="text-pink-400">ValuAI</span></h2>
          <p className="text-white/70 mb-6">Your intelligent finance co‑pilot. Just speak. It records, replies, and files.</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>✅ Voice‑activated transaction recording</li>
            <li>✅ Smart categorization of expenses</li>
            <li>✅ Real‑time financial advice</li>
            <li>✅ Predictive cash‑flow analysis</li>
            <li>✅ Multi‑language support</li>
          </ul>
        </div>
        <div className="flex-1">
          <Image src="/images/valuai-demo.png" alt="ValuAI Demo" width={500} height={300} />
        </div>
      </section>

      {/* Mission */}
      <section className="mt-24 px-6 text-center">
        <h2 className="text-4xl font-bold leading-tight">
          We're not just building software.<br />
          <span className="text-blue-400">We're building the financial backbone of Bharat.</span>
        </h2>
        <p className="text-white/70 mt-4">Every transaction, invoice, and decision — integrated into one powerful platform.</p>
      </section>

      {/* Products */}
      <section className="mt-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Initial Products</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'InDoubt.AI', path: '/student-dashboard/in-doubt', img: '/images/indoubt.png' },
            { name: 'Checker.AI', path: '/student-dashboard/checker', img: '/images/checker.png' },
            { name: 'Student Mode', path: '/student-dashboard', img: '/images/student-mode.png' },
            { name: 'ValuCommerce.AI', path: '/commerce-ai', img: '/images/valucommerce.png' },
          ].map((tool, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl overflow-hidden text-center p-4 border border-white/10">
              <Image src={tool.img} alt={tool.name} width={500} height={300} className="mx-auto" />
              <h3 className="text-xl font-semibold mt-4 mb-2">{tool.name}</h3>
              <button onClick={() => router.push(tool.path)} className="mt-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md">
                Visit
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access */}
      <section id="signup" className="bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 py-24 px-6 mt-28 text-center text-white rounded-xl max-w-6xl mx-auto shadow-2xl">
        <h2 className="text-4xl font-bold mb-2">Join the early access list.</h2>
        <p className="text-2xl text-purple-300 mb-4 font-semibold">Be part of the next financial revolution.</p>
        <p className="text-white/80 max-w-xl mx-auto mb-12">
          Get exclusive access to ValuCount before anyone else. Limited spots available.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-4 rounded-lg w-full text-black text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-6 py-2 rounded-md hover:scale-105 transition whitespace-nowrap">
            Join Waitlist
          </button>
        </div>
        <p className="text-white/60 text-sm">2847 people already joined • 153 spots remaining</p>
      </section>

      {/* Beautiful Final Footer */}
      <footer className="mt-32 bg-black/80 text-white px-6 pt-16 pb-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm text-white/80">
          <div>
            <h3 className="text-xl font-bold mb-2">Valutide Inc.</h3>
            <p>India's Financial Operating System for the next generation of businesses.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#api" className="hover:underline">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/careers" className="hover:underline">Careers</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="mailto:valutidek@gmail.com" className="hover:underline">valutidek@gmail.com</a></li>
              <li><a href="https://www.instagram.com/valutide/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://www.youtube.com/@Valutide" target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-white/60 text-xs">
          Built with love by future CA founders 🇮🇳<br />
          © 2025 <strong className="text-white">Valutide™Inc.</strong>. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
