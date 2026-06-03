'use client';

import { I, J, L, O, S, T, Z } from '@/src/constants/tetromino';
import { cn } from '@/src/lib/cn';
import { Grid, make2DArray } from '@/src/utils/make-array';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const grid = make2DArray(4, 4);
const sequence = [T, L, O, Z, J, I, S];

export const TransformTetromino = () => {
  const [index, setIndex] = useState(0);

  const isFill = (tetromino: Grid, pos: { x: number; y: number }) => {
    return tetromino[pos.x][pos.y] === 1;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sequence.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gap-px grid grid-cols-4 grid-rows-4">
      {grid.map((row, x) => row.map((_, y) => <Cell key={`${x}-${y}`} fill={isFill(sequence[index], { x, y })} />))}
    </div>
  );
};

const Cell = ({ fill }: { fill: boolean }) => {
  return (
    <motion.span
      initial={false}
      animate={{
        opacity: fill ? 1 : 0.16,
        scale: fill ? 1 : 0.55,
      }}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 28,
        mass: 0.7,
      }}
      className={cn('font-mono aspect-square size-3.5', fill ? 'bg-foreground' : 'bg-transparent')}
    />
  );
};
