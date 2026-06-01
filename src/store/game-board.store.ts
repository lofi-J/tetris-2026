import { make2DArray } from '@/src/utils/make-array';
import { create } from 'zustand';

export type Cell = {
  isFill: boolean;
};

export type GameBoard = {
  board: Cell[][];
};

const initialBoard: Cell[][] = make2DArray(20, 10).map((row) => row.map(() => ({ isFill: false })));

export const useGameBoardStore = create<GameBoard>(() => ({
  board: initialBoard,
}));

export const updateGameBoard = (board: Cell[][]) => {
  return useGameBoardStore.setState({ board });
};
