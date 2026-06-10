import React, { useState, useEffect } from 'react';
import { Container } from '../../layout/Container/Container';
import { FadeInUp } from '../../ui/motion';
import { testimonials } from '../../../data/testimonials';

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

export const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section id="testimonials" style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--color-bg-primary)' }}>
      <Container>
        <FadeInUp>
          <h2 className="section-heading">Trusted by students, parents, and schools</h2>
          <p className="section-subhead">
            Real stories from people whose digital lives have been transformed by NETHALO.
          </p>
        </FadeInUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          maxWidth: 900,
          margin: '0 auto',
        }}>
          {testimonials.map((t, i) => (
            <FadeInUp key={t.name} delay={i * 0.08}>
              <div style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-medium)',
                borderRadius: 12,
                padding: 28,
              }}>
                <div style={{ color: 'var(--color-brand-shield)', fontSize: 13, marginBottom: 12, letterSpacing: '0.05em' }}>
                  {'\u2605'.repeat(5)}
                </div>
                <p style={{
                  fontSize: 15, color: 'var(--color-text-primary)', lineHeight: 1.6, marginBottom: 16,
                  fontStyle: 'italic',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.name}</span>
                  {' \u2014 '}{t.role}
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
};
