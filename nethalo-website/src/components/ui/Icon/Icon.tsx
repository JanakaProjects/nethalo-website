import React from 'react';
import cn from 'clsx';

export interface IconProps {
  icon: React.ReactNode;
  size?: number | string;
  className?: string;
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size = 24, className, ariaLabel }) => {
  return (
    <span
      className={cn('inline-flex', className)}
      style={{ width: size, height: size }}
      aria-hidden={!ariaLabel ? true : undefined}
      aria-label={ariaLabel}
    >
      {icon}
    </span>
  );
};