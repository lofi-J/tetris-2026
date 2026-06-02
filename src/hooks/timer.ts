import { useEffect, useRef, useState } from 'react';

export const useTimer = () => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const rAFRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const savedRef = useRef(0);
  const elapsedRef = useRef(0);
  const shouldClearRef = useRef(false);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const clear = () => {
    shouldClearRef.current = true;
    savedRef.current = 0;
    elapsedRef.current = 0;

    setElapsedMs(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    startRef.current = performance.now();

    const updateElapsedMs = () => {
      const now = performance.now();
      const nextElapsedMs = savedRef.current + (now - startRef.current);

      elapsedRef.current = nextElapsedMs;
      setElapsedMs(nextElapsedMs);

      rAFRef.current = requestAnimationFrame(updateElapsedMs);
    };

    rAFRef.current = requestAnimationFrame(updateElapsedMs);

    return () => {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
        rAFRef.current = null;
      }

      if (shouldClearRef.current) {
        shouldClearRef.current = false;
        startRef.current = 0;
        return;
      }

      savedRef.current = elapsedRef.current;
    };
  }, [isRunning]);

  return { elapsedMs, start, stop, clear };
};
