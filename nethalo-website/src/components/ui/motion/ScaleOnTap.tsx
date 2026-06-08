import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScaleOnTapProps {
  children: React.ReactNode;
  className?: string;
}

export const ScaleOnTap: React.FC<ScaleOnTapProps> = ({ children, className }) => {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
};