import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../../ui/Logo/Logo';

interface NavItem { label: string; href: string; }
interface HeaderProps { navItems: NavItem[]; }

export const Header: React.FC<HeaderProps> = ({ navItems }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  // Don't show auth buttons on login/signup pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 44,
        display: 'flex', alignItems: 'center',
        background: scrolled ? 'var(--color-bg-elevated)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border-light)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <nav
        style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} aria-label="NETHALO Home">
          <Logo variant="mark" size="sm" />
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>NETHALO</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'none', gap: 32 }} className="nav-links-desktop">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                style={{
                  fontSize: 13, fontWeight: 400, color: 'var(--color-text-secondary)', textDecoration: 'none',
                  transition: 'color 0.2s', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {item.label}
              </a>
            ))}
          </div>

          {!isAuthPage && (
            <div style={{ display: 'none', alignItems: 'center', gap: 12 }} className="nav-actions-desktop">
              <button
                onClick={() => { navigate('/login'); setMobileOpen(false); }}
                style={{
                  fontSize: 13, fontWeight: 400, color: 'var(--color-text-secondary)', cursor: 'pointer',
                  background: 'none', border: 'none', padding: '0 4px', minHeight: 44,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                Sign In
              </button>
              <button
                onClick={() => { navigate('/signup'); setMobileOpen(false); }}
                style={{
                  padding: '7px 16px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
                  color: 'var(--color-text-inverse)', background: 'var(--color-brand-shield)', border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.2s', minHeight: 44,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Get Started
              </button>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
              transition: 'background 0.2s', color: 'var(--color-text-primary)',
            }}
            className="hamburger-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: 44, left: 0, right: 0, bottom: 0,
            background: 'var(--color-bg-elevated)', zIndex: 49, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60,
          }}
          role="menu"
        >
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              style={{
                display: 'block', padding: '16px 24px', width: '100%', maxWidth: 400,
                fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', textDecoration: 'none',
                textAlign: 'center', borderBottom: '1px solid var(--color-border-light)',
              }}
              role="menuitem"
            >
              {item.label}
            </a>
          ))}
          {!isAuthPage && (
            <>
              <div style={{ width: '100%', maxWidth: 400, padding: '8px 24px 0', textAlign: 'center' }}>
                <button
                  onClick={() => handleNavClick('/login')}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 9999,
                    fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)',
                    background: 'var(--color-bg-secondary)', border: 'none', cursor: 'pointer',
                    minHeight: 44, marginBottom: 8,
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('/signup')}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 9999,
                    fontSize: 16, fontWeight: 600, color: 'var(--color-text-inverse)',
                    background: 'var(--color-brand-shield)', border: 'none', cursor: 'pointer',
                    minHeight: 44,
                  }}
                >
                  Get Started Free
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
