import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style,
  circle = false
}) => {
  return (
    <div 
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : borderRadius,
        background: 'linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
      }}
    />
  );
};

export const SkeletonCard: React.FC<{ height?: number }> = ({ height = 120 }) => {
  return (
    <div style={{ 
      background: 'var(--color-bg-elevated)', 
      borderRadius: 16, 
      padding: 24, 
      border: '1px solid var(--color-border-light)',
      height,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      <Skeleton width="40%" height={20} borderRadius={6} />
      <Skeleton width="60%" height={28} borderRadius={6} />
      <Skeleton width="80%" height={16} borderRadius={4} />
    </div>
  );
};
