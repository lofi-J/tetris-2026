import { create } from 'zustand';

export enum GameStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  OVER = 'over',
}

export type GameStats = {
  level: number;
  score: number;
  clearLines: number;
  gameStatus: GameStatus;
  startedAt: Date | null;
  endedAt: Date | null;
};

export type GameStatsActions = {
  increaseLevel: () => void;
  updateScore: (points: number) => void;
  updateClearLines: (clearCount: number) => void;
  updateGameStatus: (status: GameStatus) => void;
  setStartedAt: (startedAt: Date) => void;
  setEndedAt: (endedAt: Date) => void;
  reset: () => void;
};

const defaultStats: GameStats = {
  level: 1,
  score: 0,
  clearLines: 0,
  gameStatus: GameStatus.IDLE,
  startedAt: null,
  endedAt: null,
};

export const useGameStatsStore = create<GameStats & GameStatsActions>((set, get) => ({
  ...defaultStats,
  increaseLevel: () => set((state) => ({ ...state, level: state.level + 1 })),
  updateScore: (points: number) => set((state) => ({ ...state, score: state.score + points })),
  updateClearLines: (clearCount: number) => set((state) => ({ ...state, clearLines: state.clearLines + clearCount })),
  updateGameStatus: (status: GameStatus) => set((state) => ({ ...state, gameStatus: status })),
  setStartedAt: (startedAt: Date) => set((state) => ({ ...state, startedAt })),
  setEndedAt: (endedAt: Date) => set((state) => ({ ...state, endedAt })),
  reset: () => set(defaultStats),
}));
