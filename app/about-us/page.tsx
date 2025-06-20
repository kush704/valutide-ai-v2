'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Us | Valutide</title>
        <link rel="icon" href="/valutide-logo.png" type="image/png" sizes="32x32" />
      </Head>

      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-12"
        style={{ backgroundImage: "url('/about-bg.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-gray-800 text-center max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-6 text-blue-700">About Valutide™</h1>

          <p className="text-lg leading-relaxed mb-6">
            <strong>Valutide</strong> is a revolutionary platform founded with a mission to make accounting smart, simple, and futuristic.
            Built from scratch by a passionate commerce student from India, we aim to transform the way students and businesses
            interact with accounting — through AI-driven tools, beautiful interfaces, and automation that works like magic ✨.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Our journey began with two modes — <strong>Student Mode</strong> and <strong>Business Mode</strong>.
            From helping students solve doubts using AI 📘 to building future automation for Chartered Accountants and businesses 💼,
            we are laying the foundation for the most powerful commerce assistant the world has ever seen.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            What started as a thought is growing into an ecosystem — powered by vision, dedication, and the belief
            that even a small team can create global impact. With YouTube videos, Instagram updates, and 24x7 development,
            we are just getting started 🚀.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-700">Our Vision</h2>
          <p className="text-base leading-relaxed mb-6">
            To become the world’s smartest and most accessible accounting assistant — <strong>built by youth, for the future</strong>.
            A platform that combines AI, automation, and user-friendly design to help every commerce student, CA, and business owner.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-700">Our Founder’s Belief</h2>
          <p className="text-base leading-relaxed italic mb-6">
            “I topped in academics — and now, I’m building the future of accounting. I believe the universe listens when
            we dream big and act fearlessly.” 💬
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-red-600">Follow Us</h2>
          <p className="mb-2">
            📺 YouTube:{" "}
            <a
              href="https://www.youtube.com/@valutide"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              youtube.com/@valutide
            </a>
          </p>
          <p className="mb-6">
            📸 Instagram:{" "}
            <a
              href="https://www.instagram.com/valutide"
              target="_blank"
              className="text-pink-600 hover:underline"
            >
              instagram.com/valutide
            </a>
          </p>

          <Link href="/">
            <button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full hover:scale-105 transition shadow">
              🔙 Back to Home
            </button>
          </Link>
        </div>

        <p className="mt-10 text-sm text-white text-center shadow-md bg-black bg-opacity-30 px-4 py-2 rounded-full">
          © 2025 <span className="font-semibold text-yellow-300">Valutide™</span> | Built from India, for the 🌍
        </p>
      </div>
    </>
  );
}
