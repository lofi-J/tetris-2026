'use client';

import { CSSProperties, memo, PropsWithChildren } from 'react';

import { cn } from '@/src/lib/cn';
import { useGameThemeStore } from '@/src/store/game-theme.store';
import { cva } from 'class-variance-authority';

// TODO zustand로 Theme 관리
const cell = cva('size-full', {
  variants: {
    theme: {
      normal: 'bg-white',
      cyberpunk: 'bg-blue-500',
    },
    isFill: {
      true: '',
      false: 'bg-transparent',
    },
  },
  defaultVariants: {
    theme: 'normal',
  },
});

type CellProps = {
  isFill: boolean;
  className?: string;
  style?: CSSProperties;
} & PropsWithChildren;
const Cell = ({ isFill, children, className, style }: CellProps) => {
  const theme = useGameThemeStore((state) => state.theme);
  return (
    <span style={style} className={cn(cell({ theme, isFill }), className)}>
      {children}
    </span>
  );
};

export default memo(Cell);
