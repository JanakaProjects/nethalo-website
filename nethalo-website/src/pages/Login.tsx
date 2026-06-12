import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../lib/useIsMobile';
import { useAuth } from '../lib/auth';
import { Shield, Mail, Lock, AlertCircle, User, Users, Building2 } from 'lucide-react';

type Role = 'student' | 'parent' | 'admin';

const roleTabs: { key: Role; label: string; icon: React.ReactNode; email: string; password: string }[] = [
  { key: 'student', label: 'Student', icon: <User size={16} />, email: 'student@nationalhatecrime.com', password: 'password123' },
  { key: 'parent', label: 'Parent', icon: <Users size={16} />, email: 'parent@nationalhatecrime.com', password: 'password123' },
  { key: 'admin', label: 'School Admin', icon: <Building2 size={16} />, email: 'admin@nationalhatecrime.com', password: 'password123' },
];

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  const handleRoleLogin = async (role: Role) => {
    const account = roleTabs.find(r => r.key === role)!;
    setError('');
    setLoading(true);
    try {
      const ok = await login(account.email, account.password);
      if (ok) {
        const stored = localStorage.getItem('national-hate-crime_user');
        if (stored) {
          const user = JSON.parse(stored);
          navigate(`/dashboard/${user.role}`, { replace: true });
        }
      } else {
        setError('Invalid email or password');
      }
    } catch { setError('Something went wrong'); }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        const stored = localStorage.getItem('national-hate-crime_user');
        if (stored) {
          const user = JSON.parse(stored);
          navigate(`/dashboard/${user.role}`, { replace: true });
        }
      } else {
        setError('Invalid email or password');
      }
    } catch { setError('Something went wrong'); }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? '100vh' : 'calc(100vh - 44px)', background: 'var(--color-bg-secondary)', padding: isMobile ? 16 : 24 }}>
      <div style={{ maxWidth: 400, width: '100%', background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 24 : 40, border: '1px solid var(--color-border-medium)' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32 }}>
          <Shield size={isMobile ? 32 : 40} style={{ color: 'var(--color-brand-shield)', marginBottom: 12 }} />
          <h1 style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>Sign in to your National Hate Crime account</p>
        </div>

        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: 8, textAlign: 'center' }}>Quick demo login — pick your role:</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {roleTabs.map(r => (
            <button key={r.key} onClick={() => handleRoleLogin(r.key)} disabled={loading}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: isMobile ? '10px 4px' : '14px 8px', borderRadius: 10, border: '1px solid var(--color-border-medium)',
                background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)',
                cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontSize: 12, fontWeight: 500, minHeight: 56
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--color-brand-shield)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--color-brand-shield)'; } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'var(--color-bg-secondary)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.borderColor = 'var(--color-border-medium)'; } }}>
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', marginBottom: 20 }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border-medium)' }} />
          </div>
          <div style={{ position: 'relative', textAlign: 'center', fontSize: 12, color: 'var(--color-text-muted)' }}>
            <span style={{ background: 'var(--color-bg-elevated)', padding: '0 10px' }}>or sign in manually</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }} htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required
                style={{ width: '100%', height: 44, padding: '0 14px 0 40px', borderRadius: 10, border: '1px solid var(--color-border-medium)', fontSize: 14, background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--color-brand-shield)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border-medium)'} />
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }} htmlFor="password">Password</label>
              <a href="/forgot-password" style={{ fontSize: 12, color: 'var(--color-brand-shield)', textDecoration: 'none' }} onClick={e => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required
                style={{ width: '100%', height: 44, padding: '0 14px 0 40px', borderRadius: 10, border: '1px solid var(--color-border-medium)', fontSize: 14, background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--color-brand-shield)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border-medium)'} />
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'color-mix(in srgb, var(--color-error) 15%, transparent)', borderRadius: 10, margin: '16px 0', fontSize: 13, color: 'var(--color-error)' }}>
              <AlertCircle size={14} /><span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ width: '100%', height: 44, borderRadius: 9999, fontSize: 15, fontWeight: 600, color: 'var(--color-text-inverse)', background: loading ? 'var(--color-text-muted)' : 'var(--color-brand-shield)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', minHeight: 44 }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--color-brand-shield-dark)'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--color-brand-shield)'; }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--color-text-muted)' }}>
          <span>Don&apos;t have an account? </span>
          <Link to="/signup" style={{ color: 'var(--color-brand-shield)', textDecoration: 'none', fontWeight: 500 }}>Create one</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>
          <button onClick={() => { guestLogin(); navigate('/dashboard/guest'); }} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, minHeight: 44 }}>Continue as Guest</button>
        </div>
      </div>
    </div>
  );
};
