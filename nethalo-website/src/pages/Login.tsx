import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../lib/useIsMobile';
import { useAuth } from '../lib/auth';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        const stored = localStorage.getItem('nethalo_user');
        if (stored) {
          const user = JSON.parse(stored);
          navigate(`/dashboard/${user.role}`, { replace: true });
        }
      } else {
        setError('Invalid email or password. Try student@nethalo.com / password');
      }
    } catch { setError('Something went wrong'); }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? '100vh' : 'calc(100vh - 44px)', background: '#f5f5f7', padding: isMobile ? 16 : 24 }}>
      <div style={{ maxWidth: 400, width: '100%', background: '#ffffff', borderRadius: 16, padding: isMobile ? 24 : 40, border: '1px solid #d2d2d7' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32 }}>
          <Shield size={isMobile ? 32 : 40} style={{ color: '#0071e3', marginBottom: 12 }} />
          <h1 style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>Welcome back</h1>
          <p style={{ fontSize: isMobile ? 14 : 14, color: '#6e6e73' }}>Sign in to your NETHALO account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }} htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required
                style={{ width: '100%', height: 44, padding: '0 14px 0 40px', borderRadius: 10, border: '1px solid #d2d2d7', fontSize: 14, background: '#f5f5f7', color: 'var(--color-text-primary)', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#0071e3'}
                onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }} htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required
                style={{ width: '100%', height: 44, padding: '0 14px 0 40px', borderRadius: 10, border: '1px solid #d2d2d7', fontSize: 14, background: '#f5f5f7', color: 'var(--color-text-primary)', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#0071e3'}
                onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <a href="#" style={{ fontSize: 13, color: '#0071e3', textDecoration: 'none' }} onClick={e => { e.preventDefault(); alert('Mock: Reset link sent to your email'); }}>Forgot password?</a>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#fff2f0', borderRadius: 10, marginBottom: 16, fontSize: 13, color: '#d32f2f' }}>
              <AlertCircle size={14} /><span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ width: '100%', height: 44, borderRadius: 9999, fontSize: 15, fontWeight: 600, color: 'white', background: loading ? '#6e6e73' : '#0071e3', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', minHeight: 44 }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#0077ed'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0071e3'; }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6e6e73' }}>
          <span>Don&apos;t have an account? </span>
          <Link to="/signup" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>Create one</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>
          <Link to="/dashboard/student" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Continue as Guest</Link>
        </div>
      </div>
    </div>
  );
};
