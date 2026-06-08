import React, { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { motion } from 'framer-motion';

export interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  onComplete?: () => void;
}

const fontSizes = {
  sm: 'text-base',
  base: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
  '4xl': 'text-6xl',
};

export const Counter: React.FC<CounterProps> = ({
  end,
  start = 0,
  duration = 1500,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  fontSize = '2xl',
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const completed = useRef(false);

  useEffect(() => {
    if (completed.current) return;
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      completed.current = true;
      onComplete?.();
      return;
    }

    const startTime = Date.now() + delay;
    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        completed.current = true;
        onComplete?.();
      }
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, start, duration, delay, onComplete]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });

  return (
    <motion.span
      className={cn('font-black tabular-nums', fontSizes[fontSize], className)}
      initial={false}
      animate={{ opacity: 1 }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
};