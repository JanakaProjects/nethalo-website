import React, { useState, useEffect } from 'react';
import { Container } from '../../layout/Container/Container';
import { FadeInUp } from '../../ui/motion';
import { howItWorks } from '../../../data/sections';

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

export const HowItHelps: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section id="how-it-works" style={{ padding: isMobile ? '64px 0' : '120px 0', background: '#f5f5f7' }}>
      <Container>
        <FadeInUp>
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subhead">
            Set up in minutes. Protection that runs in the background. Peace of mind that lasts.
          </p>
        </FadeInUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          maxWidth: 980,
          margin: '0 auto',
        }}>
          {howItWorks.map((step, i) => (
            <FadeInUp key={step.step} delay={i * 0.08}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: '#0071e3', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700, margin: '0 auto 20px',
                }}>
                  {step.step}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>
                  {step.body}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
};
