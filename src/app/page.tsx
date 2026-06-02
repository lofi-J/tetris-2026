'use client';

import TransformTetromino from '@/src/app/transform-tetromino';
import Boids from '@/src/components/canvas/boids';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['Space', 'Enter'].includes(event.code)) {
        navigate.push('/game');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen overflow-hidden relative">
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <h1 className="tetris-logo text-[clamp(5rem,12vw,12rem)] font-bold font-changa-one">TETRIS</h1>
        <p className="text-center text-sm text-gray-500">Press Space or Enter to start</p>
        <Link href="/game" className="mt-30 hover:scale-130 transition-all duration-300 animate-pulss">
          <TransformTetromino />
        </Link>
      </section>
      <Boids />
    </div>
  );
}
