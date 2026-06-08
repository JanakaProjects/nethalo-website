import React from 'react';
import cn from 'clsx';
import { motion } from 'framer-motion';

export type AmbientVariant = 'hero' | 'section' | 'portal' | 'minimal';
export type AmbientTheme = 'blue' | 'purple' | 'emerald' | 'pink';

export interface AmbientBackgroundProps {
  variant?: AmbientVariant;
  theme?: AmbientTheme;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  children?: React.ReactNode;
}

const themeColors: Record<AmbientTheme, { primary: string; secondary: string; tertiary: string }> = {
  blue: {
    primary: 'from-brand-blue/20 via-brand-blue/10 to-transparent',
    secondary: 'from-brand-shield/15 to-transparent',
    tertiary: 'from-brand-accent/10 to-transparent',
  },
  purple: {
    primary: 'from-purple-600/20 via-purple-600/10 to-transparent',
    secondary: 'from-pink-500/15 to-transparent',
    tertiary: 'from-brand-accent/10 to-transparent',
  },
  emerald: {
    primary: 'from-emerald-600/20 via-emerald-600/10 to-transparent',
    secondary: 'from-teal-500/15 to-transparent',
    tertiary: 'from-brand-shield/10 to-transparent',
  },
  pink: {
    primary: 'from-brand-pink/20 via-brand-pink/10 to-transparent',
    secondary: 'from-rose-500/15 to-transparent',
    tertiary: 'from-brand-yellow/10 to-transparent',
  },
};

const variantConfig = {
  hero: {
    orbs: 3,
    sizes: ['w-[80vw] h-[80vw]', 'w-[60vw] h-[60vw]', 'w-[50vw] h-[50vw]'],
    positions: [
      'top-[-20%] left-[-20%]',
      'bottom-[-15%] right-[-15%]',
      'top-[40%] left-[30%]',
    ],
    blurs: ['blur-[160px]', 'blur-[140px]', 'blur-[120px]'],
  },
  section: {
    orbs: 2,
    sizes: ['w-[50vw] h-[50vw]', 'w-[40vw] h-[40vw]'],
    positions: [
      'top-[-10%] right-[-10%]',
      'bottom-[-10%] left-[-10%]',
    ],
    blurs: ['blur-[120px]', 'blur-[100px]'],
  },
  portal: {
    orbs: 2,
    sizes: ['w-[60vw] h-[60vw]', 'w-[40vw] h-[40vw]'],
    positions: [
      'top-[-15%] left-[-15%]',
      'bottom-[-15%] right-[-15%]',
    ],
    blurs: ['blur-[140px]', 'blur-[100px]'],
  },
  minimal: {
    orbs: 1,
    sizes: ['w-[40vw] h-[40vw]'],
    positions: ['top-[-5%] right-[-5%]'],
    blurs: ['blur-[100px]'],
  },
};

const intensityMultipliers = {
  subtle: 0.5,
  medium: 1,
  strong: 1.5,
};

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  variant = 'section',
  theme = 'blue',
  intensity = 'medium',
  className,
  children,
}) => {
  const config = variantConfig[variant];
  const colors = themeColors[theme];
  const multiplier = intensityMultipliers[intensity];

  const orbs = Array.from({ length: config.orbs }, (_, i) => (
    <motion.div
      key={i}
      className={cn(
        'absolute rounded-full',
        config.sizes[i],
        config.positions[i],
        config.blurs[i],
        'bg-gradient-to-br',
        colors.primary,
      )}
      style={{ opacity: 0.3 * multiplier }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.3 * multiplier }}
      transition={{ duration: 2, delay: i * 0.3, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {i === 0 && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br"
          style={{ background: colors.secondary, opacity: 0.5 * multiplier }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3 * multiplier, 0.6 * multiplier, 0.3 * multiplier] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  ));

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-0 overflow-hidden', className)}>
      {orbs}
      {children}
    </div>
  );
};