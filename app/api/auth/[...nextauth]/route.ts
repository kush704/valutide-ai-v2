// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/', // optional: redirect to homepage
  },
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.sub;
      return session;
    },
  },
});

// ✅ Only export handler as GET and POST
export { handler as GET, handler as POST };
