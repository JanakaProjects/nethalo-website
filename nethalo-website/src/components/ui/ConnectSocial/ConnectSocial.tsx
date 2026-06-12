import React, { useState } from 'react';
import { Shield, ExternalLink, Check, Loader } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  scopes: string[];
  authUrl: string;
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    color: '#E4405F',
    scopes: ['instagram_basic', 'instagram_manage_comments'],
    authUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: '𝕏',
    color: '#000000',
    scopes: ['tweet.read', 'tweet.write', 'users.read'],
    authUrl: 'https://x.com/i/oauth2/authorize',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    scopes: ['video.publish', 'video.upload'],
    authUrl: 'https://www.tiktok.com/v2/auth/authorize/',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '💬',
    color: '#5865F2',
    scopes: ['bot', 'messages.read'],
    authUrl: 'https://discord.com/api/oauth2/authorize',
  },
];

interface ConnectSocialProps {
  onConnect?: (platform: string) => void;
  connectedPlatforms?: string[];
  isMobile?: boolean;
}

export const ConnectSocial: React.FC<ConnectSocialProps> = ({ onConnect, connectedPlatforms = [], isMobile = false }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleConnect = (platform: Platform) => {
    setLoading(platform.id);
    if (onConnect) onConnect(platform.id);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
      {platforms.map(p => {
        const isConnected = connectedPlatforms.includes(p.id);
        const isLoading = loading === p.id;
        return (
          <button key={p.id} onClick={() => !isConnected && handleConnect(p)} disabled={isConnected || isLoading}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 14, border: `1px solid ${isConnected ? 'var(--color-brand-shield)' : 'var(--color-border-light)'}`, background: isConnected ? 'color-mix(in srgb, var(--color-brand-shield) 5%, var(--color-bg-elevated))' : 'var(--color-bg-elevated)', cursor: isConnected ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left', minHeight: 60 }}
            onMouseEnter={e => { if (!isConnected) { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
            onMouseLeave={e => { if (!isConnected) { e.currentTarget.style.borderColor = 'var(--color-border-light)'; e.currentTarget.style.transform = 'none'; } }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${p.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: isConnected ? 'var(--color-brand-shield)' : 'var(--color-text-muted)' }}>
                {isLoading ? 'Connecting...' : isConnected ? 'Connected & Monitoring' : 'Connect for AI moderation'}
              </div>
            </div>
            <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isConnected ? 'var(--color-brand-shield)' : 'var(--color-text-muted)' }}>
              {isLoading ? <Loader size={16} className="spin" /> : isConnected ? <Check size={16} /> : <ExternalLink size={16} />}
            </div>
          </button>
        );
      })}
    </div>
  );
};
