import React from 'react';
import cn from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverLift = true, ...rest }) => {
  const base = cn('glass-base', 'p-6', 'rounded-2xl', className);
  const lift = hoverLift ? 'glass-hover-lift' : '';
  return (
    <div className={cn(base, lift)} {...rest}>
      {children}
    </div>
  );
};