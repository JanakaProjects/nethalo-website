import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout/DashboardLayout';
import { useIsMobile } from '../lib/useIsMobile';
import { useAuth } from '../lib/auth';
import { Camera, Music2, Ghost, MessageCircle, Headphones, Check, Plus, Loader2, AlertCircle } from 'lucide-react';
import type { ConnectedAccount } from '../lib/api';
import { getAccounts, connectAccount, disconnectAccount } from '../lib/api';

const platformIcons: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  instagram: Camera, tiktok: Music2, snapchat: Ghost, twitter: MessageCircle, whatsapp: MessageCircle, discord: Headphones,
};

const DEFAULT_ACCOUNTS: ConnectedAccount[] = [
  { platform: 'instagram', label: 'Instagram', connected: false },
  { platform: 'tiktok', label: 'TikTok', connected: false },
  { platform: 'snapchat', label: 'Snapchat', connected: false },
  { platform: 'twitter', label: 'X (Twitter)', connected: false },
  { platform: 'whatsapp', label: 'WhatsApp', connected: false },
  { platform: 'discord', label: 'Discord', connected: false },
];

export const Connect: React.FC = () => {
  const isMobile = useIsMobile(768);
  useAuth();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(DEFAULT_ACCOUNTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingPlatform, setPendingPlatform] = useState<string | null>(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await getAccounts();
        const merged = DEFAULT_ACCOUNTS.map(def => {
          const saved = data.accounts.find(a => a.platform === def.platform);
          return saved ? { ...def, ...saved } : def;
        });
        setAccounts(merged);
      } catch (e) {
        setError('Failed to load connected accounts');
      } finally {
        setLoading(false);
      }
    };
    loadAccounts();
  }, []);

  const handleToggle = async (platform: string) => {
    const acc = accounts.find(a => a.platform === platform);
    if (!acc) return;

    setPendingPlatform(platform);
    setError(null);
    try {
      if (acc.connected) {
        await disconnectAccount(platform);
      } else {
        await connectAccount(platform, acc.label);
      }
      const data = await getAccounts();
      const merged = DEFAULT_ACCOUNTS.map(def => {
        const saved = data.accounts.find(a => a.platform === def.platform);
        return saved ? { ...def, ...saved } : def;
      });
      setAccounts(merged);
    } catch (e) {
      setError('Failed to update connection');
    } finally {
      setPendingPlatform(null);
    }
  };

  const connectedCount = accounts.filter(a => a.connected).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-brand-shield)' }} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4, letterSpacing: '-0.02em' }}>Connect Accounts</h1>
      <p style={{ fontSize: isMobile ? 14 : 14, color: 'var(--color-text-secondary)', marginBottom: isMobile ? 20 : 28 }}>
        {connectedCount} of {accounts.length} platforms connected
      </p>

      {error && (
        <div style={{ padding: 12, borderRadius: 12, background: '#fff0ee', color: '#ff3b30', fontSize: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? 12 : 16 }}>
        {accounts.map(acc => {
          const Icon = platformIcons[acc.platform] || MessageCircle;
          const isPending = pendingPlatform === acc.platform;
          return (
            <div key={acc.platform}
              style={{
                background: 'var(--color-bg-elevated)', border: `1px solid ${acc.connected ? '#30d158' : 'var(--color-border-medium)'}`,
                borderRadius: 12, padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column',
                transition: 'all 0.2s', opacity: isPending ? 0.7 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 12, background: acc.connected ? '#f0fff4' : 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={isMobile ? 20 : 22} style={{ color: acc.connected ? '#30d158' : 'var(--color-text-secondary)' }} />
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>{acc.label}</div>
                  {acc.connected && acc.username && (
                    <div style={{ fontSize: 13, color: '#30d158', marginTop: 2 }}>{acc.username}</div>
                  )}
                </div>
                {acc.connected && <Check size={20} style={{ color: '#30d158', marginLeft: 'auto' }} />}
              </div>

              <div style={{ fontSize: isMobile ? 13 : 13, color: 'var(--color-text-secondary)', marginBottom: 16, flex: 1 }}>
                {acc.connected
                  ? `Connected since ${acc.connected_at || 'recently'}. NETHALO is monitoring this platform for threats.`
                  : `Connect your ${acc.label} account to enable real-time threat detection.`}
              </div>

              <button onClick={() => handleToggle(acc.platform)} disabled={isPending}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', height: 44, borderRadius: 9999, fontSize: 14, fontWeight: 600,
                  cursor: isPending ? 'not-allowed' : 'pointer', transition: 'all 0.2s', border: 'none',
                  background: acc.connected ? 'var(--color-bg-secondary)' : 'var(--color-brand-shield)',
                  color: acc.connected ? 'var(--color-text-primary)' : 'var(--color-text-inverse)',
                  minHeight: 44, opacity: isPending ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (!acc.connected && !isPending) e.currentTarget.style.background = 'var(--color-brand-blue-hover)'; }}
                onMouseLeave={e => { if (!acc.connected && !isPending) e.currentTarget.style.background = 'var(--color-brand-shield)'; }}
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : acc.connected ? <><Check size={16} /> Connected</> : <><Plus size={16} /> Connect {acc.label}</>}
              </button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
