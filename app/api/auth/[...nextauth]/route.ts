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
  secret: process.env.NEXTAUTH_SECRET, // ✅ Needed in production
  pages: {
    signIn: '/', // Redirect to homepage
  },
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore: Custom user ID in session
      session.user.id = token.sub;
      return session;
    },
  },
};

// ✅ Export handler for both GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
