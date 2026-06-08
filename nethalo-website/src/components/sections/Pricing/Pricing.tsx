import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../layout/Container/Container';
import { FadeInUp } from '../../ui/motion';
import { Check } from 'lucide-react';
import { pricingPlans } from '../../../data/pricing';

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

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <section id="pricing" style={{ padding: isMobile ? '64px 0' : '120px 0', background: '#f5f5f7' }}>
      <Container>
        <FadeInUp>
          <h2 className="section-heading">Choose your protection</h2>
          <p className="section-subhead">
            Simple, transparent pricing. No hidden fees. Start free, upgrade anytime.
          </p>
        </FadeInUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          maxWidth: 980,
          margin: '0 auto',
        }}>
          {pricingPlans.map((plan, i) => (
            <FadeInUp key={plan.name} delay={i * 0.08}>
              <div style={{
                background: '#ffffff',
                border: `1px solid ${plan.highlighted ? '#0071e3' : '#d2d2d7'}`,
                borderRadius: 12,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 420,
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em' }}>
                    {plan.price}
                  </span>
                  {plan.period && <span style={{ fontSize: 14, color: '#6e6e73', marginLeft: 4 }}>{plan.period}</span>}
                </div>
                <p style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24, lineHeight: 1.4 }}>
                  {plan.description}
                </p>

                <ul style={{ marginBottom: 32, flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                      <Check size={16} style={{ color: '#0071e3', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: '#6e6e73' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/signup')}
                  style={{
                    width: '100%', padding: '12px 24px', borderRadius: 9999,
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    border: 'none', minHeight: 44, transition: 'all 0.2s',
                    background: plan.highlighted ? '#0071e3' : '#f5f5f7',
                    color: plan.highlighted ? 'white' : '#1d1d1f',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
                >
                  {plan.cta}
                </button>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
};
