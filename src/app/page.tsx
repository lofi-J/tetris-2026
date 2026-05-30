'use client';

import TransformTetromino from '@/src/app/transform-tetromino';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Escape') {
        navigate.push('/game');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <section className="flex flex-col items-center justify-center flex-1">
        <h1 className="tetris-logo text-[clamp(5rem,12vw,12rem)] font-bold font-changa-one">TETRIS</h1>

        <Link href="/game" className="mt-30 hover:scale-130 transition-all duration-300 animate-pulss">
          <TransformTetromino />
        </Link>
      </section>
    </div>
  );
}
