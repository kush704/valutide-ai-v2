import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientLayout from './ClientLayout';  // Ensure filename casing matches
export const metadata = { title: 'Valutide' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/valutide-logo.png" />
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
