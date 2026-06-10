import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { StaggerContainer } from '../../components/ui/motion/StaggerContainer';
import { FadeInUp } from '../../components/ui/motion/FadeInUp';
import StatCard from '../../components/ui/StatCard/StatCard';
import { useIsMobile } from '../../lib/useIsMobile';
import { useAuth } from '../../lib/auth';
import { useParentData } from '../../lib/useDashboardData';
import { Shield, Activity, AlertTriangle, Eye, Download } from 'lucide-react';

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'online': return { background: '#e8f8e8', color: '#34c759' };
    case 'away': return { background: '#fff3e0', color: '#ff9500' };
    default: return { background: '#f5f5f7', color: '#86868b' };
  }
};

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { stats, children, weeklyActivity, isLoading, error } = useParentData(user?.id);
  const isMobile = useIsMobile(768);

  const barData = weeklyActivity.length > 0
    ? weeklyActivity.map(d => ({ label: d.day.slice(5), value: d.threats }))
    : [];
  const maxBarValue = barData.length > 0 ? Math.max(...barData.map(b => b.value)) : 1;
  const barScale = maxBarValue > 90 ? 1 : 90 / Math.max(maxBarValue, 1);

  return (
    <DashboardLayout>
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1d1d1f', margin: 0, letterSpacing: '-0.02em' }}>Parent Dashboard</h1>
        <p style={{ fontSize: isMobile ? 14 : 16, color: '#86868b', marginTop: 6 }}>Monitor your child&apos;s safety at a glance</p>
      </div>

      {error && (
        <div style={{ padding: 12, borderRadius: 12, background: '#fff0ee', color: '#ff3b30', fontSize: 14, marginBottom: 16 }}>{error}</div>
      )}

      <StaggerContainer>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: isMobile ? 12 : 16, marginBottom: isMobile ? 24 : 32 }}>
          {[
            { icon: <Shield size={isMobile ? 18 : 22} />, label: 'Overall Safety', value: stats?.safeScore ? `${stats.safeScore}%` : '-', color: '#34c759' },
            { icon: <AlertTriangle size={isMobile ? 18 : 22} />, label: 'Active Alerts', value: stats?.totalThreats ?? '-', trend: stats?.totalThreats ? `-${stats.totalThreats}` : undefined, trendUp: false, color: '#ff9500' },
            { icon: <Eye size={isMobile ? 18 : 22} />, label: 'Monitored Children', value: stats?.connectedChildren ?? children.length, color: '#0071e3' },
            { icon: <Activity size={isMobile ? 18 : 22} />, label: 'Reports This Month', value: stats?.activeReports ?? '-', trend: stats?.activeReports ? `+${stats.activeReports}` : undefined, trendUp: false, color: '#af52de' },
          ].map((card, i) => (
            <FadeInUp key={card.label} delay={i * 0.1}>
              <StatCard icon={card.icon} label={card.label} value={card.value} trend={card.trend} trendUp={card.trendUp} color={card.color} isMobile={isMobile} isLoading={isLoading} />
            </FadeInUp>
          ))}
        </div>
      </StaggerContainer>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 24, marginBottom: isMobile ? 24 : 32 }}>
        <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px 24px 20px', border: '1px solid #e8e8ed' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 4px 0' }}>Flagged Interactions</h3>
              <p style={{ fontSize: isMobile ? 13 : 14, color: '#86868b', margin: 0 }}>Threats detected this week</p>
            </div>
            <a href="/api/export/threats" download style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8, background: '#f0f7ff', color: '#0071e3', fontSize: 12, fontWeight: 600, textDecoration: 'none', minHeight: 32 }}>
              <Download size={14} /> Export
            </a>
          </div>
          {barData.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 8, height: isMobile ? 100 : 140 }}>
              {barData.map((bar, i) => {
                const scaledValue = Math.max(Math.round(bar.value * barScale), 6);
                return (
                  <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b' }}>{bar.value}</div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${scaledValue}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: '100%', borderRadius: '4px 4px 3px 3px', background: 'linear-gradient(180deg, #34c759 0%, #88e088 100%)', maxHeight: isMobile ? 70 : 100, minHeight: 6 }}
                    />
                    <div style={{ fontSize: isMobile ? 10 : 12, color: '#86868b' }}>{bar.label}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: '#86868b', textAlign: 'center', padding: 20 }}>No data this week</div>
          )}
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid #e8e8ed' }}>
          <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 16px 0' }}>Recent Updates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 14 }}>
            {[
              { text: `${stats?.totalThreats || 0} total threats detected`, time: 'Current', icon: <Shield size={14} />, color: '#0071e3' },
              { text: `${stats?.threatsBlocked || 0} threats blocked automatically`, time: 'Current', icon: <Shield size={14} />, color: '#34c759' },
              { text: `${stats?.activeReports || 0} active reports`, time: 'Current', icon: <Activity size={14} />, color: '#af52de' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: '#1d1d1f', lineHeight: 1.4 }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: '#86868b', marginTop: 2 }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid #e8e8ed' }}>
        <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 12px 0' }}>Connected Children</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 12 }}>
          {children.length > 0 ? children.map((child, i) => {
            const statusStyle = getStatusStyle(child.status);
            return (
              <div key={child.id || i} style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 14, padding: isMobile ? '12px' : '14px 16px', borderRadius: 12, background: '#f5f5f7', transition: 'all 0.2s', cursor: 'default' }}>
                <div style={{ width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius: '50%', background: '#0071e3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 14 : 16, fontWeight: 700, flexShrink: 0 }}>{child.name.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1d1d1f' }}>{child.name}</div>
                  <div style={{ fontSize: isMobile ? 12 : 13, color: '#86868b' }}>{child.grade || 'N/A'} · Last active: {child.last_active || 'Unknown'}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, padding: isMobile ? '3px 10px' : '4px 12px', borderRadius: 20, ...statusStyle, whiteSpace: 'nowrap' }}>{child.status}</div>
              </div>
            );
          }) : (
            <div style={{ fontSize: 14, color: '#86868b', textAlign: 'center', padding: 20 }}>No children connected yet</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;