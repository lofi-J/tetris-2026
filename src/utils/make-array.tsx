export type Grid = number[][];

export const make2DArray = (x: number, y: number): Grid => {
  return Array.from({ length: x }, () => Array.from({ length: y }, () => 0));
};
