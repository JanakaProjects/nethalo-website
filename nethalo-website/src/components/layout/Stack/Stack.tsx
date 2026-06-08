import React from 'react';
import cn from 'clsx';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
}

const directionStyles = {
  row: 'flex-row',
  col: 'flex-col',
};

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignStyles = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'col',
  gap = 'md',
  align = 'start',
  justify = 'start',
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'flex',
        directionStyles[direction],
        gapStyles[gap],
        alignStyles[align],
        justifyStyles[justify],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};