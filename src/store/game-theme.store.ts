import { create } from 'zustand';

export type GameTheme = {
  theme: 'normal' | 'cyberpunk';
};

export const useGameThemeStore = create<GameTheme>(() => ({ theme: 'normal' }));

export const setGameTheme = (theme: GameTheme['theme']) => {
  return useGameThemeStore.setState({ theme });
};
