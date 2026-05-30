'use client';

import TransformTetromino from '@/src/app/transform-tetromino';
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
        <p className="font-changa-one text-[clamp(1.2rem,1.5vw,1.5rem)] tracking-normal text-cyan-200 drop-shadow-[0_0_16px_rgba(255,255,255,0.82)]">
          Made by Lofi-J
        </p>
        <div className="mt-30">
          <TransformTetromino />
        </div>
      </section>
    </div>
  );
}
