import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lofi-J Tetris 2026 | Lofi Web Game',
  description: 'Play Lofi-J Tetris 2026, a lofi web-game inspired by classic tetris with chill lofi vibes for 2026.',
  keywords: ['tetris', 'web-game', 'lofi', 'lofi-j', '2026년', 'Tetris 2026', 'Lofi-J Tetris', 'lofi web game'],
  openGraph: {
    title: 'Lofi-J Tetris 2026 | Lofi Web Game',
    description: 'A chill lofi web-game experience for fans of tetris, Lofi-J, and 2026 browser games.',
    type: 'website',
    siteName: 'Lofi-J Tetris 2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lofi-J Tetris 2026 | Lofi Web Game',
    description: 'Play a lofi-inspired tetris web-game built for 2026 with Lofi-J vibes.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
