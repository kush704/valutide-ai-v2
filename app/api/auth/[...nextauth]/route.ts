// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // ✅ Required in production
  pages: {
    signIn: '/', // Redirects to your homepage or custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore: adding user id to session
      session.user.id = token.sub;
      return session;
    },
  },
};

// ✅ Export only handler (not named exports)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
