'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home'); // <-- Replace '/home' with your actual homepage route if it's not '/home'
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm md:max-w-lg">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-auto rounded-xl shadow-lg"
        >
          <source src="/Kalutide.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2 className="text-white text-center text-base sm:text-lg md:text-2xl font-semibold mt-4 px-2">
        Empowering Accounting. Enabling Dreams.
      </h2>
    </div>
  );
}
