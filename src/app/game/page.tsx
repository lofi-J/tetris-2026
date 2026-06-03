'use client';

import BoardController from '@/src/components/board/board-controller';
import BoardRenderer from '@/src/components/board/board-renderer';
import { useTimer } from '@/src/hooks/timer';
import { GameStatus, useGameStatsStore } from '@/src/store/game-stats.store';
import { useEffect } from 'react';

export default function Game() {
  const { elapsedMs, start, stop } = useTimer();
  const updateGameStatus = useGameStatsStore((state) => state.updateGameStatus);

  const startGame = () => {
    updateGameStatus(GameStatus.RUNNING);
    start();
  };

  useEffect(() => {
    const stopGame = () => {
      updateGameStatus(GameStatus.PAUSED);
      stop();
    };
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        stopGame();
      }
    });
  }, [stop, updateGameStatus]);

  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <BoardRenderer />
      <BoardController />
      <button onClick={startGame} className="border border-gray-500 rounded-md p-2">
        START
      </button>
      <h1>time: {elapsedMs}</h1>
    </div>
  );
}
