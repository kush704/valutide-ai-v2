import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // ← This MUST be present
  pages: { signIn: '/' },
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.sub;
      return session;
    },
  },
};

console.log('NEXTAUTH_SECRET set?', Boolean(process.env.NEXTAUTH_SECRET));

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
