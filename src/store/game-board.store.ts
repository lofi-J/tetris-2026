import { make2DArray } from '@/src/utils/make-array';
import { create } from 'zustand';

export type Cell = {
  isFill: boolean;
};

export type GameBoard = {
  board: Cell[][];
  updateBoard: (board: Cell[][]) => void;
  resetBoard: () => void;
};

const initialBoard: Cell[][] = make2DArray(20, 10).map((row) => row.map(() => ({ isFill: false })));

export const useGameBoardStore = create<GameBoard>((set) => ({
  board: initialBoard,
  updateBoard: (board: Cell[][]) => set({ board }),
  resetBoard: () => set({ board: initialBoard }),
}));
