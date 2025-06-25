import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react'; // ✅ Import Analytics

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Valutide',
  description: 'Empowering Accounting. Enabling Dreams.',
  icons: {
    icon: '/valutide-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics /> {/* ✅ Add Analytics component here */}
      </body>
    </html>
  );
}
