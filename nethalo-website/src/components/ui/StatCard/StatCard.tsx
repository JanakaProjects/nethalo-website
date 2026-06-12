import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  color: string;
  isMobile: boolean;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, trendUp, color, isMobile, isLoading }) => {
  const shimmerStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: 6,
  };

  if (isLoading) {
    return (
      <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid var(--color-border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: 10, ...shimmerStyle }} />
          <div style={{ width: 40, height: 16, borderRadius: 4, ...shimmerStyle }} />
        </div>
        <div style={{ marginTop: isMobile ? 12 : 20 }}>
          <div style={{ width: '60%', height: isMobile ? 22 : 28, borderRadius: 6, ...shimmerStyle }} />
          <div style={{ width: '40%', height: 14, borderRadius: 4, marginTop: 8, ...shimmerStyle }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid var(--color-border-light)', transition: 'all 0.3s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: trendUp ? '#34c759' : '#ff3b30' }}>
            <TrendingUp size={12} style={{ transform: trendUp ? 'none' : 'rotate(180deg)' }} />
            {trend}
          </div>
        )}
      </div>
      <div style={{ marginTop: isMobile ? 12 : 20 }}>
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
        <div style={{ fontSize: isMobile ? 13 : 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
};

export default StatCard;