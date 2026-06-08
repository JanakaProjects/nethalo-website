import React from 'react';
import cn from 'clsx';

export type LogoVariant = 'full' | 'mark' | 'wordmark';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

const sizes = {
  sm: { icon: 28, font: '1.25rem', gap: '8px' },
  md: { icon: 40, font: '1.5rem', gap: '12px' },
  lg: { icon: 48, font: '1.75rem', gap: '12px' },
  xl: { icon: 64, font: '2rem', gap: '16px' },
};

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className }) => {
  const { icon, font, gap } = sizes[size];

  const LogoMark = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={icon} height={icon}>
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#0d6efd" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M50 5 L10 25 V75 L50 95 L90 75 V25 L50 5 Z" fill="url(#sg)" stroke="#0284c7" strokeWidth="3" />
      <ellipse cx="50" cy="48" rx="28" ry="18" stroke="#e91e8c" strokeWidth="3" fill="none" />
      <path d="M50 20 L50 70" stroke="#e91e8c" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 40 L50 60 L75 40" stroke="#e91e8c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (variant === 'mark') return <LogoMark />;

  return (
    <div className={cn('flex items-center', className)} style={{ gap }}>
      <LogoMark />
      {variant === 'full' && <span style={{ fontSize: font, fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.02em' }}>NETHALO</span>}
    </div>
  );
};
