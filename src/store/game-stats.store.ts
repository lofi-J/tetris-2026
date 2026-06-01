import { create } from 'zustand';

export type GameStats = {
  level: number;
  score: number;
  clearLines: number;
};

export type GameStatsActions = {
  increaseLevel: () => void;
  updateScore: (points: number) => void;
  updateClearLines: (clearCount: number) => void;
  reset: () => void;
};

const defaultStats: GameStats = {
  level: 1,
  score: 0,
  clearLines: 0,
};

export const useGameStatsStore = create<GameStats & GameStatsActions>((set) => ({
  ...defaultStats,
  increaseLevel: () => set((state) => ({ ...state, level: state.level + 1 })),
  updateScore: (points: number) => set((state) => ({ ...state, score: state.score + points })),
  updateClearLines: (clearCount: number) => set((state) => ({ ...state, clearLines: state.clearLines + clearCount })),
  reset: () => set(defaultStats),
}));
