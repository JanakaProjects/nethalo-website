import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Logo } from '../../ui/Logo/Logo';
import { MaMo } from '../../ui/MaMo/MaMo';
import { DeviceMockups } from '../../ui/DeviceMockups/DeviceMockups';
import { hero } from '../../../data/hero';

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

const floatingShapes = [
  { icon: 'shield', x: '15%', y: '20%', size: 32, delay: 0, duration: 6 },
  { icon: 'hexagon', x: '80%', y: '15%', size: 24, delay: 1, duration: 7 },
  { icon: 'shield', x: '75%', y: '70%', size: 28, delay: 2, duration: 5 },
  { icon: 'hexagon', x: '10%', y: '75%', size: 20, delay: 0.5, duration: 8 },
  { icon: 'shield', x: '50%', y: '10%', size: 18, delay: 1.5, duration: 6.5 },
  { icon: 'hexagon', x: '88%', y: '45%', size: 22, delay: 0.8, duration: 7.5 },
];

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '80px 16px 40px' : '120px 24px 60px', textAlign: 'center', overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, var(--color-bg-secondary) 100%)',
      }}
    >
      {/* Animated gradient mesh */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,113,227,0.08) 0%, rgba(139,92,246,0.05) 30%, rgba(233,30,140,0.04) 60%, transparent 100%)',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating decorative elements */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', left: shape.x, top: shape.y, zIndex: 1, opacity: 0.12,
            width: shape.size, height: shape.size, pointerEvents: 'none',
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-shield)" strokeWidth="1.5" width={shape.size} height={shape.size}>
            {shape.icon === 'shield' ? (
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            ) : (
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            )}
          </svg>
        </motion.div>
      ))}

      <motion.div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 24 }}
        >
          <Logo variant="mark" size="xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 700, letterSpacing: '-0.015em',
            lineHeight: 1.05, color: 'var(--color-text-primary)', maxWidth: 800, marginBottom: 16,
          }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 400, lineHeight: 1.5,
            color: 'var(--color-text-muted)', maxWidth: 640, marginBottom: 32,
          }}
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button onClick={() => navigate('/signup')}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 28px', fontSize: 15, fontWeight: 600, color: 'var(--color-text-inverse)',
              background: 'var(--color-brand-shield)', borderRadius: 9999, border: 'none', cursor: 'pointer',
              transition: 'all 0.2s', minWidth: 180, minHeight: 44,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-brand-shield-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-brand-shield)'}
          >
            Get Started Free
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: 0.6, marginTop: 32 }}
        >
          <MaMo pose="zen" size={80} />
        </motion.div>

        <motion.div style={{ perspective: 1000 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <motion.div style={{ rotateX, rotateY }}>
            <DeviceMockups />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
