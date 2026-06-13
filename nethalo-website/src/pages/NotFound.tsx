import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';

export const NotFound: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
    <div style={{ textAlign: 'center' }}>
      <Shield size={96} style={{ color: 'var(--color-brand-pink)', opacity: 0.4, margin: '0 auto 16px' }} />
      <h1 style={{ fontSize: 96, fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: 12 }}>404</h1>
      <p style={{ fontSize: 20, color: 'var(--color-text-muted)', marginBottom: 32 }}>This digital realm doesn&apos;t exist... yet.</p>
      <Link
        to="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', borderRadius: 9999, background: 'var(--color-brand-shield)', color: '#ffffff', fontSize: 18, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
      >
        <Home size={20} /> Return Home
      </Link>
    </div>
  </div>
);