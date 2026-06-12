import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Logo } from '../../ui/Logo/Logo';
import { useAppTheme } from '../../../lib/theme';
import { NotificationBell } from '../../ui/NotificationBell/NotificationBell';

interface DropdownItem {
  label: string;
  desc?: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

interface HeaderProps {
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ navItems }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useAppTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) setOpenDropdown(null);
  }, [mobileOpen]);

  const handleNavClick = (href?: string) => {
    if (!href) return;
    if (href.startsWith('/')) navigate(href);
    else if (href.startsWith('#')) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const navBarBg = scrolled
    ? 'var(--color-bg-elevated)'
    : 'transparent';

  const navBarBorder = scrolled
    ? 'var(--color-border-light)'
    : 'transparent';

  const glassStyle: React.CSSProperties = {
    backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
    transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
  };

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 44,
        display: 'flex', alignItems: 'center',
        background: navBarBg,
        borderBottom: `1px solid ${navBarBorder}`,
        ...glassStyle,
      }}
    >
      <nav
        style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 22px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', zIndex: 1 }} aria-label="National Hate Crime Home">
          <Logo variant="mark" size="sm" />
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>National Hate Crime</span>
        </a>

        {/* Desktop Nav */}
        <div ref={navRef} style={{ display: 'none', gap: 0, alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="nav-links-desktop">
          {navItems.map(item => (
            <div key={item.label} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => item.dropdown ? setOpenDropdown(openDropdown === item.label ? null : item.label) : handleNavClick(item.href)}
                style={{
                  fontSize: 12, fontWeight: 400, color: 'var(--color-text-secondary)', textDecoration: 'none',
                  padding: '0 20px', height: 44, display: 'flex', alignItems: 'center', gap: 4,
                  background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.01em',
                  transition: 'color 0.2s', position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={e => { if (openDropdown !== item.label) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={10} style={{ opacity: 0.5, transition: 'transform 0.25s', transform: openDropdown === item.label ? 'rotate(180deg)' : 'none' }} />}
              </button>
              {item.dropdown && (
                <div
                  style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    paddingTop: 4, opacity: openDropdown === item.label ? 1 : 0,
                    visibility: openDropdown === item.label ? 'visible' : 'hidden',
                    transition: 'opacity 0.2s ease, visibility 0.2s ease', pointerEvents: openDropdown === item.label ? 'auto' : 'none',
                  }}
                >
                  <div style={{
                    background: 'var(--color-bg-elevated)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    borderRadius: 14, border: '1px solid var(--color-border-light)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)', overflow: 'hidden',
                    minWidth: 200, padding: 6,
                  }}>
                    {item.dropdown.map((sub, i) => (
                      <button
                        key={i} onClick={() => { handleNavClick(sub.href); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px',
                          borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left',
                          transition: 'background 0.15s', minHeight: 40,
                          color: 'var(--color-text-primary)', fontSize: 12, fontWeight: 500,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        {sub.icon && <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-shield)', flexShrink: 0 }}>{sub.icon}</span>}
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>{sub.label}</div>
                          {sub.desc && <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 1 }}>{sub.desc}</div>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Actions */}
        {!isAuthPage && (
          <div style={{ display: 'none', alignItems: 'center', gap: 10, zIndex: 1 }} className="nav-actions-desktop">
            <NotificationBell />
            <button
              onClick={toggleTheme}
              style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s, background 0.2s', minHeight: 44,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.background = 'var(--color-bg-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'none'; }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => { navigate('/login'); setMobileOpen(false); }}
              style={{
                fontSize: 12, fontWeight: 400, color: 'var(--color-text-secondary)', cursor: 'pointer',
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
                padding: '7px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
                color: '#ffffff', background: 'var(--color-brand-shield)', border: 'none', cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.2s', minHeight: 36,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Get Started
            </button>
          </div>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
            transition: 'background 0.2s', color: 'var(--color-text-primary)', zIndex: 1,
          }}
          className="hamburger-btn"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: 44, left: 0, right: 0, bottom: 0,
            background: 'var(--color-bg-primary)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            zIndex: 49, display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: 24, overflowY: 'auto',
          }}
          role="menu"
        >
          {navItems.map(item => (
            <div key={item.label} style={{ width: '100%', maxWidth: 400 }}>
              <button
                onClick={() => {
                  if (item.dropdown) setOpenDropdown(openDropdown === item.label ? null : item.label);
                  else handleNavClick(item.href);
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                  padding: '14px 24px', fontSize: 18, fontWeight: 500,
                  color: 'var(--color-text-primary)', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', minHeight: 52,
                }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={16} style={{ opacity: 0.5, transition: 'transform 0.2s', transform: openDropdown === item.label ? 'rotate(180deg)' : 'none' }} />}
              </button>
              {item.dropdown && openDropdown === item.label && (
                <div style={{ padding: '0 24px 12px' }}>
                  {item.dropdown.map((sub, i) => (
                    <button
                      key={i} onClick={() => handleNavClick(sub.href)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 12px',
                        borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left',
                        color: 'var(--color-text-primary)', fontSize: 15, fontWeight: 400, minHeight: 44,
                      }}
                    >
                      {sub.icon && <span style={{ width: 20, height: 20, color: 'var(--color-brand-shield)', flexShrink: 0 }}>{sub.icon}</span>}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>{sub.label}</div>
                        {sub.desc && <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 1 }}>{sub.desc}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {!isAuthPage && (
            <div style={{ width: '100%', maxWidth: 400, padding: '8px 24px 0', textAlign: 'center', marginTop: 8 }}>
              <button
                onClick={() => { toggleTheme(); setMobileOpen(false); }}
                style={{
                  width: '100%', padding: '14px', borderRadius: 9999,
                  fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)',
                  background: 'var(--color-bg-secondary)', border: 'none', cursor: 'pointer',
                  minHeight: 44, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
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
                  fontSize: 16, fontWeight: 600, color: '#ffffff',
                  background: 'var(--color-brand-shield)', border: 'none', cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

