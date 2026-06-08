import React from 'react';
import { useInView } from '../../../hooks/useInView';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0, duration = 0.6, className, style }) => {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
