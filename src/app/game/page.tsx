'use client';

import BoardController from '@/src/components/board/board-controller';
import BoardRenderer from '@/src/components/board/board-renderer';
import { setGameTheme } from '@/src/store/game-theme.store';

export default function Game() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <BoardRenderer />
      <BoardController />
      <button onClick={() => setGameTheme('cyberpunk')}>theme change</button>
    </div>
  );
}
