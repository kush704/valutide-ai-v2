import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientLayout from './ClientLayout'; // ✅ CORRECT

export const metadata = {
  title: 'Valutide',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/valutide-logo.png" type="image/png" sizes="32x32" />
      </head>
      <body>
        <ClientLayout>
          {children}
          <SpeedInsights />
        </ClientLayout>
      </body>
    </html>
  );
}
