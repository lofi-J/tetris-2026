type GameKeyCode = 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp' | 'ShiftLeft' | 'Space' | 'Escape';
type GameAction = 'move-left' | 'move-right' | 'soft-drop' | 'rotate-right' | 'swap-piece' | 'hard-drop' | 'pause';

type GameKeyMap = Record<GameKeyCode, GameAction>;

export const GamekeyMap = {
  ArrowLeft: 'move-left',
  ArrowRight: 'move-right',
  ArrowDown: 'soft-drop',
  ArrowUp: 'rotate-right',
  ShiftLeft: 'swap-piece',
  Space: 'hard-drop',
  Escape: 'pause',
} satisfies GameKeyMap;
