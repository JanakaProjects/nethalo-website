import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, Users, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { useIsMobile } from '../../lib/useIsMobile';

const previewFeatures = [
  { icon: <Shield size={22} />, label: 'AI Threat Detection', desc: 'Real-time cyberbullying detection across platforms', color: 'var(--color-brand-shield)' },
  { icon: <Eye size={22} />, label: 'Parent Dashboard', desc: 'Monitor your child\'s online safety', color: 'var(--color-brand-shield)' },
  { icon: <Users size={22} />, label: 'Support Network', desc: 'Connect with counselors and trusted contacts', color: 'var(--color-brand-shield)' },
  { icon: <AlertTriangle size={22} />, label: 'Anonymous Reporting', desc: 'Report concerns safely and confidentially', color: 'var(--color-brand-shield)' },
];

export const GuestDashboard: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', paddingTop: 44 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? '32px 16px' : '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--color-brand-shield-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-brand-shield)' }}>
            <Shield size={28} />
          </div>
          <h1 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>Welcome to NETHALO</h1>
          <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.5, maxWidth: 480, margin: '0 auto' }}>You're viewing a preview. Create a free account to unlock full protection.</p>
          <button onClick={() => navigate('/signup')}
            style={{ marginTop: 20, padding: '12px 32px', borderRadius: 9999, fontSize: 15, fontWeight: 600, color: '#ffffff', background: 'var(--color-brand-shield)', border: 'none', cursor: 'pointer', minHeight: 44 }}>
            Sign Up Free
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
          {previewFeatures.map((f, i) => (
            <div key={i} style={{ padding: 20, borderRadius: 14, border: '1px solid var(--color-border-light)', background: 'var(--color-bg-elevated)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-brand-shield-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>{f.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 2 }}>{f.desc}</div>
                </div>
                <Lock size={16} style={{ color: 'var(--color-text-muted)', opacity: 0.5, flexShrink: 0 }} />
              </div>
              <button onClick={() => navigate('/signup')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--color-brand-shield)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, minHeight: 36 }}>
                Unlock with account <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: 24, borderRadius: 14, background: 'var(--color-bg-secondary)', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>Already have an account? <button onClick={() => navigate('/login')} style={{ color: 'var(--color-brand-shield)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, padding: 0, minHeight: 36 }}>Sign in</button></p>
        </div>
      </div>
    </div>
  );
};
