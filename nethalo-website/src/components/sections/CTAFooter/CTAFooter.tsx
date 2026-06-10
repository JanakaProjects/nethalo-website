import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Container } from '../../layout/Container/Container';
import { FadeInUp } from '../../ui/motion';
import { Logo } from '../../ui/Logo/Logo';
import { navigation } from '../../../data/navigation';

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

export const CTAFooter: React.FC = () => {
  const navigate = useNavigate();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const isMobile = useIsMobile();

  return (
    <>
      <section style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--color-bg-secondary)', textAlign: 'center' }}>
        <Container>
          <FadeInUp>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Ready to Defend Your Digital World?
            </h2>
            <p className="section-subhead" style={{ marginBottom: 32, maxWidth: 500 }}>
              Join thousands of students, parents, and schools already protected by NETHALO.
            </p>
            <button onClick={() => navigate('/signup')} className="btn-primary" style={{ minWidth: 200 }}>
              Sign Up Free
            </button>
          </FadeInUp>
        </Container>
      </section>

      <footer style={{ padding: '40px 0', background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border-medium)' }}>
        <Container>
          <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} aria-label="NETHALO Home">
              <Logo variant="mark" size="sm" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>NETHALO</span>
            </a>

            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {navigation.footerLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: 12, color: 'var(--color-text-muted)', textDecoration: 'none', cursor: 'pointer' }}
                  onClick={(e) => { if (link.href.startsWith('#')) { e.preventDefault(); const el = document.querySelector(link.href); el?.scrollIntoView({ behavior: 'smooth' }); } }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={scrollToTop}
                style={{
                  fontSize: 12, color: 'var(--color-text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  minHeight: 44, background: 'none', border: 'none',
                }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={12} />
                Back to top
              </button>
            </div>
          </div>

          <div style={{
            marginTop: 24, paddingTop: 16,
            borderTop: '1px solid var(--color-border-light)',
            fontSize: 12, color: 'var(--color-text-secondary)',
            display: 'flex', justifyContent: 'center',
          }}>
            {navigation.legalText}
          </div>
        </Container>
      </footer>
    </>
  );
};
