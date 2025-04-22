// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Valutide',
  description: 'Your AI partner for doubts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
