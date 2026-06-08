import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import cn from 'clsx';
import { motion } from 'framer-motion';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const positions: Record<string, string> = {
    top: '-translate-x-1/2 -top-2 left-1/2 mb-2',
    bottom: '-translate-x-1/2 -bottom-2 left-1/2 mt-2',
    left: '-translate-y-1/2 -left-2 top-1/2 mr-2',
    right: '-translate-y-1/2 -right-2 top-1/2 ml-2',
  };

  const tooltip = visible && createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        'absolute z-[700] glass-elevated px-3 py-2 rounded-lg text-xs text-white whitespace-nowrap',
        'shadow-xl pointer-events-none',
        positions[position] || positions.top,
        className
      )}
      role="tooltip"
    >
      {content}
    </motion.div>,
    document.body
  );

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(children, {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      } as React.HTMLAttributes<HTMLElement>)}
      {tooltip}
    </span>
  );
};