import React, { useEffect, useState } from 'react';
import cn from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export interface StatChipProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  animated?: boolean;
  className?: string;
}

export const StatChip: React.FC<StatChipProps> = ({
  value,
  label,
  icon,
  trend = 'neutral',
  trendLabel,
  animated = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/,/g, ''));

  useEffect(() => {
    if (!animated || isNaN(numericValue)) {
      setDisplayValue(numericValue || 0);
      return;
    }

    const duration = 1500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [animated, numericValue]);

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-muted';

  return (
    <div className={cn('glass-stat', className)}>
      {icon && <div className="mb-3 text-brand-pink">{icon}</div>}
      <div className="font-black text-primary mb-1" style={{ fontSize: 'var(--text-3xl)' }}>
        <motion.span
          key={displayValue}
          initial={false}
          animate={{ opacity: 1 }}
        >
          {typeof value === 'string' && value.includes(',') ? displayValue.toLocaleString() : displayValue}
        </motion.span>
        {typeof value === 'string' && value.includes('%') && '%'}
        {typeof value === 'string' && value.includes('ms') && 'ms'}
      </div>
      <div className="text-sm text-muted uppercase tracking-widest font-medium">{label}</div>
      {(trend !== 'neutral' || trendLabel) && (
        <div className={cn('mt-2 flex items-center gap-1 text-xs font-medium', trendColor)}>
          <TrendIcon className="w-3 h-3" aria-hidden="true" />
          {trendLabel}
        </div>
      )}
    </div>
  );
};