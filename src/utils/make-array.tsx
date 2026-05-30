export const make2DArray = (x: number, y: number) => {
  return Array.from({ length: x }, () => Array.from({ length: y }, () => 0));
};
