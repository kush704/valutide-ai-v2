'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const jobOpenings = [
  {
    role: 'Full-Stack Engineer',
    desc: 'Build and scale our web platform using React, Next.js & Node.',
  },
  {
    role: 'Machine Learning Engineer',
    desc: 'Develop AI models for financial prediction and categorization.',
  },
  {
    role: 'DevOps / Cloud Engineer',
    desc: 'Manage CI/CD, AWS infra, and deployment pipelines.',
  },
  {
    role: 'CA / Tax Specialist',
    desc: 'Design and validate accounting, GST and compliance workflows.',
  },
  {
    role: 'Product Designer',
    desc: 'Create intuitive UX/UI for diverse SME & CA users.',
  },
];

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">Careers at Valutide</h1>
        <p className="text-center text-white/70 mb-12 text-lg">
          Building finance tools from Bharat, for Bharat — and the world. Join us on this ambitious journey.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {jobOpenings.map((job, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2 text-white">{job.role}</h3>
              <p className="text-white/70 mb-4">{job.desc}</p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=valutidek@gmail.com&su=${encodeURIComponent(
                  'Application for ' + job.role + ' at Valutide'
                )}&body=${encodeURIComponent(
                  `Hi Valutide Team,\n\nI’m excited to apply for the role of ${job.role}. Please find my resume attached.\n\nRegards,\n[Your Name]`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-white/50 text-sm">
          Don’t see a role that fits? <br />
          Email us your profile at{' '}
          <a href="mailto:valutidek@gmail.com" className="underline hover:text-white">
            valutidek@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
