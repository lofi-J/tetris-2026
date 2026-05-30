'use client';

import { CSSProperties, memo, PropsWithChildren } from 'react';

import { cn } from '../../lib/cn';

type CellProps = {
  isFill: boolean;
  className?: string;
  style?: CSSProperties;
} & PropsWithChildren;
const Cell = ({ isFill, children, className, style }: CellProps) => {
  return (
    <span style={style} className={cn('w-4 h-4', !isFill && 'bg-transparent', className)}>
      {children}
    </span>
  );
};

export default memo(Cell);
