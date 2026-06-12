import React, { useState, useEffect } from 'react';
import { Shield, Eye, Users } from 'lucide-react';
import { Container } from '../../layout/Container/Container';
import { FadeInUp } from '../../ui/motion';
import { features } from '../../../data/sections';

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

const icons: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = { shield: Shield, eye: Eye, users: Users };

export const Solution: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section id="features" style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--color-bg-primary)' }}>
      <Container>
        <FadeInUp>
          <h2 className="section-heading">Meet National Hate Crime</h2>
          <p className="section-subhead">
            The first AI layer purpose-built to protect young people across every social platform.
          </p>
        </FadeInUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32,
          maxWidth: 980,
          margin: '0 auto',
        }}>
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <FadeInUp key={f.title} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 16px',
                  }}>
                    {Icon && <Icon size={22} style={{ color: 'var(--color-brand-pink)' }} />}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.5, maxWidth: 300, margin: '0 auto' }}>
                    {f.body}
                  </p>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

