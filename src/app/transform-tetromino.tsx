'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

type BlockPosition = {
  row: number;
  col: number;
};

type TetrominoShape = {
  blocks: BlockPosition[];
};

const CELL_SIZE = 24;
const GRID_SIZE = 4;
const GRADIENT_PADDING = 40;
const TRANSFORM_INTERVAL_MS = 900;

const tetrominoSequence: TetrominoShape[] = [
  {
    blocks: [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ],
  },
  {
    blocks: [
      { row: 2, col: 2 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 0 },
    ],
  },
  {
    blocks: [
      { row: 2, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  },
  {
    blocks: [
      { row: 2, col: 3 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  },
  {
    blocks: [
      { row: 1, col: 3 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  },
  {
    blocks: [
      { row: 1, col: 3 },
      { row: 2, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  },
  {
    blocks: [
      { row: 1, col: 3 },
      { row: 2, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 1 },
    ],
  },
];

export default function TransformTetromino() {
  const [shapeIndex, setShapeIndex] = useState(0);

  const blockPositions = tetrominoSequence[shapeIndex].blocks;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShapeIndex((currentIndex) => (currentIndex + 1) % tetrominoSequence.length);
    }, TRANSFORM_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="relative overflow-visible"
      style={{
        width: GRID_SIZE * CELL_SIZE + GRADIENT_PADDING * 2,
        height: GRID_SIZE * CELL_SIZE + GRADIENT_PADDING * 2,
        background:
          'radial-gradient(ellipse at 50% 58%, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.08) 56%, transparent 100%)',
      }}
    >
      <span
        className="pointer-events-none absolute rounded-full blur-2xl"
        style={{
          left: GRADIENT_PADDING - CELL_SIZE * 0.7,
          top: GRADIENT_PADDING - CELL_SIZE * 0.55,
          width: GRID_SIZE * CELL_SIZE + CELL_SIZE * 1.4,
          height: GRID_SIZE * CELL_SIZE + CELL_SIZE * 1.4,
          background:
            'radial-gradient(ellipse at center, rgba(147, 197, 253, 0.24) 0%, rgba(56, 189, 248, 0.14) 34%, rgba(14, 116, 144, 0.06) 58%, transparent 78%)',
        }}
      />
      <span
        className="pointer-events-none absolute rounded-full blur-xl"
        style={{
          left: GRADIENT_PADDING + CELL_SIZE * 0.1,
          top: GRADIENT_PADDING + CELL_SIZE * 1.85,
          width: CELL_SIZE * 3.8,
          height: CELL_SIZE * 1.3,
          background:
            'radial-gradient(ellipse at center, rgba(186, 230, 253, 0.28) 0%, rgba(56, 189, 248, 0.14) 42%, transparent 76%)',
        }}
      />
      {blockPositions.map((position, index) => (
        <motion.span
          key={index}
          className="absolute size-6 rounded-[6px] border border-sky-200/45 bg-slate-950/90"
          style={{
            boxShadow:
              '0 0 14px rgba(125, 211, 252, 0.34), 0 0 28px rgba(14, 116, 144, 0.18), inset 0 0 0 1px rgba(125, 211, 252, 0.16)',
          }}
          animate={{
            x: GRADIENT_PADDING + position.col * CELL_SIZE,
            y: GRADIENT_PADDING + position.row * CELL_SIZE,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
