import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useIsMobile } from '../lib/useIsMobile';

export const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile(768);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Account not found. Check your email and try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? '100vh' : 'calc(100vh - 44px)', background: 'var(--color-bg-secondary)', padding: isMobile ? 16 : 24 }}>
      <div style={{ maxWidth: 400, width: '100%', background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 24 : 40, border: '1px solid var(--color-border-medium)' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--color-brand-shield-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-brand-shield)' }}>
            {sent ? <CheckCircle size={28} /> : <Mail size={28} />}
          </div>
          <h1 style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>
            {sent ? 'Check your email' : 'Reset your password'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
            {sent ? `We sent a reset link to ${email}` : 'Enter your email and we\'ll send you a link to reset your password'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required
                  style={{ width: '100%', height: 44, padding: '0 14px 0 40px', borderRadius: 10, border: '1px solid var(--color-border-medium)', fontSize: 14, background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-brand-shield)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border-medium)'} />
              </div>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'color-mix(in srgb, var(--color-error) 15%, transparent)', borderRadius: 10, marginBottom: 16, fontSize: 13, color: 'var(--color-error)' }}>
                <AlertCircle size={14} /><span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', height: 44, borderRadius: 9999, fontSize: 15, fontWeight: 600, color: '#ffffff', background: loading ? 'var(--color-text-muted)' : 'var(--color-brand-shield)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', minHeight: 44 }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => { setSent(false); setEmail(''); }}
              style={{ padding: '10px 20px', borderRadius: 9999, fontSize: 14, fontWeight: 500, color: 'var(--color-brand-shield)', background: 'var(--color-brand-shield-light)', border: 'none', cursor: 'pointer' }}>
              Send another link
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
