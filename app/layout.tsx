import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Valutide',
  icons: {
    icon: '/valutide-logo.png', // file should be inside /public
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
