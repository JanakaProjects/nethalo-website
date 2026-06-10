import React, { useState, useEffect } from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  background?: 'white' | 'gray';
  className?: string;
  style?: React.CSSProperties;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

export const Section: React.FC<SectionProps> = ({ children, id, background = 'white', className, style }) => {
  const isMobile = useIsMobile();
  return (
    <section
      id={id}
      className={className}
      style={{
        padding: isMobile ? '48px 0' : '80px 0',
        background: background === 'gray' ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
        ...style,
      }}
    >
      {children}
    </section>
  );
};
