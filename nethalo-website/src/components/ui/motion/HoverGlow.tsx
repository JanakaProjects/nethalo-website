import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HoverGlowProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const HoverGlow: React.FC<HoverGlowProps> = ({ children, color = 'rgba(14, 165, 233, 0.15)', className }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileHover={{ boxShadow: `0 0 30px ${color}` }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};