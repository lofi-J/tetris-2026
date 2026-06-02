'use client';

import BoardController from '@/src/components/board/board-controller';
import BoardRenderer from '@/src/components/board/board-renderer';
import { useTimer } from '@/src/hooks/timer';

export default function Game() {
  const { elapsedMs, start, stop } = useTimer();
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <BoardRenderer />
      <BoardController />
      <h1>time: {elapsedMs}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
