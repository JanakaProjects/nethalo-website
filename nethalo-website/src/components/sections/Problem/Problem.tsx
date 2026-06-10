import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '../../layout/Container/Container';
import { FadeInUp } from '../../ui/motion';
import { CountUp } from '../../ui/CountUp';
import { stats } from '../../../data/sections';

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

const StatCard: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => {
  const num = parseInt(value);
  const isPercent = value.includes('%');
  const isMultiplier = value.includes('×');
  const endValue = isMultiplier ? 2 : num;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.02em',
        color: 'var(--color-text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        {isMultiplier ? (
          <CountUp end={endValue} suffix="×" duration={2} delay={index * 0.15} />
        ) : (
          <CountUp end={endValue} suffix={isPercent ? '%' : ''} duration={2} delay={index * 0.15} />
        )}
      </div>
      <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.4 }}>{label}</div>
      <ProgressBar inViewDelay={index * 0.15 + 0.5} />
    </div>
  );
};

const ProgressBar: React.FC<{ inViewDelay: number }> = ({ inViewDelay }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} style={{ width: '60%', height: 3, background: '#e8e8ed', borderRadius: 2, margin: '12px auto 0', overflow: 'hidden' }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, delay: inViewDelay, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: '100%', background: 'linear-gradient(90deg, #0071e3, #8b5cf6)', borderRadius: 2, transformOrigin: 'left' }}
      />
    </div>
  );
};

export const Problem: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0', background: '#f5f5f7' }}>
      <Container>
        <FadeInUp>
          <p style={{
            fontSize: 14, fontWeight: 600, color: '#6e6e73',
            textAlign: 'center', letterSpacing: '0.04em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            The Crisis
          </p>
          <h2 className="section-heading" style={{ marginBottom: 8 }}>
            Cyberbullying is an epidemic
          </h2>
          <p className="section-subhead" style={{ marginBottom: 64 }}>
            Every day, thousands of young people face harassment online. The numbers demand action.
          </p>
        </FadeInUp>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48, maxWidth: 900, margin: '0 auto',
        }}>
          {stats.map((s, i) => (
            <FadeInUp key={s.label} delay={i * 0.08}>
              <StatCard value={s.value} label={s.label} index={i} />
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
};
