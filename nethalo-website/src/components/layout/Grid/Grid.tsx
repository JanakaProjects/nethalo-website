import React from 'react';
import cn from 'clsx';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 'auto';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const colStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
};

const gapStyles = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

export const Grid: React.FC<GridProps> = ({ children, cols = 3, gap = 'lg', className, ...rest }) => {
  return (
    <div className={cn('grid', colStyles[cols], gapStyles[gap], className)} {...rest}>
      {children}
    </div>
  );
};