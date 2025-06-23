'use client';
import NextAuthProvider from './SessionProvider'; // make sure path is correct

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  );
}
