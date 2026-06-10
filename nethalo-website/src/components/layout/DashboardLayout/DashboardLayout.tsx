import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../lib/auth';
import { useIsMobile } from '../../../lib/useIsMobile';
import { useAppTheme } from '../../../lib/theme';
import { LayoutDashboard, Link2, Settings, HelpCircle, LogOut, Menu, Shield, X, Sun, Moon, BookOpen, FileText } from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Journal', href: '/journal' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Link2, label: 'Connect', href: '/connect' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);
  const { theme, toggleTheme } = useAppTheme();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  const handleLogout = useCallback(() => { logout(); navigate('/login', { replace: true }); }, [logout, navigate]);

  const isActive = useCallback((href: string) => {
    if (href === '/dashboard') return location.pathname.startsWith('/dashboard');
    return location.pathname === href;
  }, [location.pathname]);

  const handleNav = useCallback((href: string) => {
    navigate(href);
    if (isMobile) setSidebarOpen(false);
  }, [navigate, isMobile]);

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: isMobile ? '20px 16px' : '24px 20px', borderBottom: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Shield size={isMobile ? 24 : 28} style={{ color: '#0071e3' }} />
          <span style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>NETHALO</span>
        </Link>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: '#f5f5f7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', minHeight: 44, minWidth: 44 }} aria-label="Close menu" type="button">
            <X size={20} />
          </button>
        )}
      </div>
      <nav style={{ flex: 1, padding: isMobile ? '12px 8px' : '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sidebarItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <button key={item.label} onClick={() => handleNav(item.href)} role="link" aria-current={active ? 'page' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: isMobile ? '14px 12px' : '12px 14px',
                borderRadius: 10, fontSize: isMobile ? 15 : 14, fontWeight: 500, textDecoration: 'none', width: '100%',
                transition: 'all 0.2s', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: active ? 'var(--color-brand-shield-light)' : 'transparent',
                color: active ? '#0071e3' : 'var(--color-text-secondary)',
                position: 'relative', minHeight: 44,
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--color-bg-tertiary)'; e.currentTarget.style.color = 'var(--color-text-primary)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; } }}
            >
              {active && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', background: '#0071e3' }} />}
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div style={{ padding: isMobile ? '12px 8px' : '16px 12px', borderTop: '1px solid var(--color-border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: isMobile ? '14px 12px' : '12px 14px', borderRadius: 10, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0071e3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={handleLogout} type="button" aria-label="Log out"
          style={{ display: 'flex', alignItems: 'center', gap: 14, padding: isMobile ? '14px 12px' : '12px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', border: 'none', background: 'none', cursor: 'pointer', width: '100%', transition: 'all 0.2s', minHeight: 44 }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fff2f0'; e.currentTarget.style.color = '#d32f2f'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}>
          <LogOut size={20} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      {!isMobile && (
        <aside style={{ width: 260, background: 'var(--color-bg-elevated)', borderRight: '1px solid var(--color-border-light)', flexShrink: 0, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 30 }}>
          {sidebarContent}
        </aside>
      )}

      {isMobile && sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex' }} role="dialog" aria-modal="true">
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.4)' }} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div style={{ width: 280, maxWidth: '80vw', background: 'var(--color-bg-elevated)', height: '100%', overflowY: 'auto', boxShadow: '4px 0 24px rgba(0,0,0,0.15)' }}>
            {sidebarContent}
          </div>
        </div>
      )}

      <div style={{ flex: 1, marginLeft: isMobile ? 0 : 260 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '12px 16px' : '14px 20px', background: 'var(--color-bg-elevated)', borderBottom: '1px solid var(--color-border-light)', position: 'sticky', top: 0, zIndex: 20 }}>
          <button onClick={() => setSidebarOpen(true)} style={{ padding: 8, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary)' }} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={22} style={{ color: '#0071e3' }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)' }}>NETHALO</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={toggleTheme}
              style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--color-bg-tertiary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', minHeight: 44, minWidth: 44 }}
              aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0071e3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>

        <div style={{ padding: isMobile ? '20px 16px' : '28px 20px', maxWidth: 960, margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
