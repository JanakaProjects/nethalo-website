import React from 'react';
import cn from 'clsx';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
  ...rest
}) => {
  const base = cn(
    'inline-flex',
    'items-center',
    'gap-1.5',
    'font-medium',
    'rounded-full',
    'border',
    {
      'px-2 py-0.5 text-xs': size === 'sm',
      'px-3 py-1 text-sm': size === 'md',
      'px-4 py-1.5 text-base': size === 'lg',
    }
  );

  const variantStyles = cn({
    'bg-brand-pink/10 text-brand-pink border-brand-pink/30': variant === 'brand',
    'bg-green-500/10 text-green-400 border-green-500/30': variant === 'success',
    'bg-yellow-500/10 text-yellow-400 border-yellow-500/30': variant === 'warning',
    'bg-red-500/10 text-red-400 border-red-500/30': variant === 'error',
    'bg-blue-500/10 text-blue-400 border-blue-500/30': variant === 'info',
    'bg-white/10 text-white border-white/20': variant === 'default',
  });

  return (
    <span className={cn(base, variantStyles, className)} {...rest}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'default' ? 'bg-white/50' : 'bg-current'}`} />}
      {children}
    </span>
  );
};