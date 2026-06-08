import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HoverLiftProps {
  children: React.ReactNode;
  lift?: number;
  scale?: number;
  className?: string;
  as?: 'div' | 'span' | 'button' | 'a';
}

export const HoverLift: React.FC<HoverLiftProps> = ({ children, lift = -4, scale = 1.005, className, as: Component = 'div' }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <Component className={className}>{children}</Component>;
  return (
    <motion.div
      className={className}
      whileHover={{ y: lift, scale }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};