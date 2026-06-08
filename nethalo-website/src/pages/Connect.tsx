import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout/DashboardLayout';
import { useIsMobile } from '../lib/useIsMobile';
import { Camera, Music2, Ghost, MessageCircle, Headphones, Check, Plus } from 'lucide-react';
import type { ConnectedAccount } from '../lib/mockData';
import { socialPlatforms } from '../lib/mockData';

const platformIcons: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  instagram: Camera, tiktok: Music2, snapchat: Ghost, twitter: MessageCircle, whatsapp: MessageCircle, discord: Headphones,
};

export const Connect: React.FC = () => {
  const isMobile = useIsMobile(768);
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(() => {
    const stored = localStorage.getItem('nethalo_connections');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return socialPlatforms;
  });

  const toggleConnection = (platform: string) => {
    const updated = accounts.map(a => {
      if (a.platform !== platform) return a;
      if (a.connected) return { ...a, connected: false, username: undefined, connectedAt: undefined };
      return { ...a, connected: true, username: `@user_${platform}`, connectedAt: new Date().toISOString().split('T')[0] };
    });
    setAccounts(updated);
    localStorage.setItem('nethalo_connections', JSON.stringify(updated));
  };

  const connectedCount = accounts.filter(a => a.connected).length;

  return (
    <DashboardLayout>
      <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1d1d1f', marginBottom: 4, letterSpacing: '-0.02em' }}>Connect Accounts</h1>
      <p style={{ fontSize: isMobile ? 14 : 14, color: '#6e6e73', marginBottom: isMobile ? 20 : 28 }}>
        {connectedCount} of {accounts.length} platforms connected
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? 12 : 16 }}>
        {accounts.map(acc => {
          const Icon = platformIcons[acc.platform] || MessageCircle;
          return (
            <div key={acc.platform}
              style={{
                background: '#ffffff', border: `1px solid ${acc.connected ? '#30d158' : '#d2d2d7'}`,
                borderRadius: 12, padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 12, background: acc.connected ? '#f0fff4' : '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={isMobile ? 20 : 22} style={{ color: acc.connected ? '#30d158' : '#86868b' }} />
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1d1d1f' }}>{acc.label}</div>
                  {acc.connected && acc.username && (
                    <div style={{ fontSize: 13, color: '#30d158', marginTop: 2 }}>{acc.username}</div>
                  )}
                </div>
                {acc.connected && <Check size={20} style={{ color: '#30d158', marginLeft: 'auto' }} />}
              </div>

              <div style={{ fontSize: isMobile ? 13 : 13, color: '#6e6e73', marginBottom: 16, flex: 1 }}>
                {acc.connected
                  ? `Connected since ${acc.connectedAt}. NETHALO is monitoring this platform for threats.`
                  : `Connect your ${acc.label} account to enable real-time threat detection.`}
              </div>

              <button onClick={() => toggleConnection(acc.platform)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', height: 44, borderRadius: 9999, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                  background: acc.connected ? '#f5f5f7' : '#0071e3',
                  color: acc.connected ? '#1d1d1f' : 'white',
                  minHeight: 44,
                }}
                onMouseEnter={e => { if (!acc.connected) e.currentTarget.style.background = '#0077ed'; }}
                onMouseLeave={e => { if (!acc.connected) e.currentTarget.style.background = '#0071e3'; }}
              >
                {acc.connected ? <><Check size={16} /> Connected</> : <><Plus size={16} /> Connect {acc.label}</>}
              </button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
