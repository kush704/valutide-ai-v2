'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center mt-4">
        <p className="text-lg font-medium text-gray-800">
          Signed in as {session.user?.email}
        </p>
        <button
          onClick={() => signOut()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="text-center mt-4">
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
