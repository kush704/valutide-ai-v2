// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

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
      <head>
        <link rel="icon" href="/valutide-logo.png" type="image/png" />
        <title>Valutide</title>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
