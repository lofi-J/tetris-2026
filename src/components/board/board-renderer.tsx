'use client';

import Cell from '@/src/components/tetromino/cell';
import { useGameBoardStore } from '@/src/store/game-board.store';

export default function BoardRenderer() {
  const board = useGameBoardStore((state) => state.board);

  return (
    <div className="w-[200px] h-[400px] border border-gray-500 grid grid-cols-10 grid-rows-20">
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => <Cell isFill={cell.isFill} key={`row-${rowIndex}-cell-${cellIndex}`} />),
      )}
    </div>
  );
}
