import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Valutide', // Set default title here
  description: 'Your AI-powered assistant for students and businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Add custom head settings here */}
        <Head>
          <title>Valutide</title>
        </Head>
        {children}
      </body>
    </html>
  );
}

