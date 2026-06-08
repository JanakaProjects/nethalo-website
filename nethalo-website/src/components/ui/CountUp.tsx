import React from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
}

export const CountUp: React.FC<CountUpProps> = ({ end, suffix = '', duration = 2, delay = 0, style }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.01, delay }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.01, delay: delay + 0.01 }}
        >
          {inView ? (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <CountUpNumber end={end} duration={duration} delay={delay} inView={inView} />
              {suffix}
            </motion.span>
          ) : (
            <span>0{suffix}</span>
          )}
        </motion.span>
      </motion.span>
    </div>
  );
};

const CountUpNumber: React.FC<{ end: number; duration: number; delay: number; inView: boolean }> = ({ end, duration, delay, inView }) => {
  const [count, setCount] = React.useState(0);
  const startTime = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!inView) return;
    startTime.current = null;
    const animate = (time: number) => {
      if (startTime.current === null) startTime.current = time - delay * 1000;
      const elapsed = time - startTime.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [end, duration, delay, inView]);

  return <>{count}</>;
};
