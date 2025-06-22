import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NextAuthProvider from './SessionProvider';

export const metadata = { title: 'Valutide' };

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("./api/auth/[...nextauth]/route");
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          {children}
          <SpeedInsights />
        </NextAuthProvider>
      </body>
    </html>
  );
}
