'use client';

import { TransformTetromino } from '@/src/app/transform-tetromino';
import { TETRIS } from '@/src/constants/ascii';
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
        <pre
          className="font-mono text-[12px] lg:text-[15px] leading-[125%] text-foreground select-none"
          dangerouslySetInnerHTML={{ __html: TETRIS.trim() }}
        />
        <p className="text-center text-sm py-6 lg:py-8">Press Space or Enter to start</p>
        <Link href="/game" className="hover:scale-130 transition-all duration-300 animate-pulss">
          <TransformTetromino />
        </Link>
      </section>
    </div>
  );
}
