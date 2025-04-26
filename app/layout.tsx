// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Valutide',
  description: 'Your AI partner for doubts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
