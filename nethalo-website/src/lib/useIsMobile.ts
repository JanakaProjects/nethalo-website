import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return width < breakpoint;
}
