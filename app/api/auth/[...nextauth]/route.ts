import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/', // Redirects to homepage for sign-in
  },
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore: extending session with user ID
      session.user.id = token.sub;
      return session;
    },
  },
};

// ✅ ✅ ✅ Export only handler (no named exports)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
