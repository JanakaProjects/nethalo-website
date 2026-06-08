import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { StaggerContainer } from '../../components/ui/motion/StaggerContainer';
import { FadeInUp } from '../../components/ui/motion/FadeInUp';
import StatCard from '../../components/ui/StatCard/StatCard';
import { useIsMobile } from '../../lib/useIsMobile';
import { useAdminData } from '../../lib/useDashboardData';
import type { Report } from '../../lib/api';
import {
  Shield, Users, TrendingUp, AlertTriangle, FileText, Clock,
} from 'lucide-react';

const priorityMeta = (type: string) => {
  const high = ['critical', 'harassment', 'threatening'];
  const med = ['cyberbullying', 'hate speech'];
  const t = type?.toLowerCase() ?? '';
  if (high.some((h: string) => t.includes(h))) return { label: 'High', bg: '#fff0ee', color: '#ff3b30', iconColor: '#ff3b30' };
  if (med.some((m: string) => t.includes(m))) return { label: 'Medium', bg: '#fff3e0', color: '#ff9500', iconColor: '#ff9500' };
  return { label: 'Low', bg: '#e8f0fe', color: '#0071e3', iconColor: '#0071e3' };
};

const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const AdminDashboard: React.FC = () => {
  const isMobile = useIsMobile(768);

  const {
    stats = null,
    pendingReports = [],
    recentActivity = [],
    isLoading,
    error,
  } = useAdminData();

  const barData = recentActivity.length > 0
    ? recentActivity.slice(0, 7).map((a, i) => ({
        day: WEEK_LABELS[i] || `#${i + 1}`,
        threats: a.severity === 'critical' ? 90 : a.severity === 'high' ? 70 : a.severity === 'medium' ? 40 : 20,
      }))
    : [];

  const maxBarValue = barData.length
    ? Math.max(...barData.map((b: { threats: number }) => b.threats))
    : 0;

  return (
    <DashboardLayout>
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1d1d1f', margin: 0, letterSpacing: '-0.02em' }}>Admin Dashboard</h1>
        <p style={{ fontSize: isMobile ? 14 : 16, color: '#86868b', marginTop: 6 }}>School-wide safety oversight</p>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', borderRadius: 12, background: '#fff0ee', color: '#ff3b30', fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      <StaggerContainer>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: isMobile ? 12 : 16, marginBottom: isMobile ? 24 : 32 }}>
          {[
            { icon: <Users size={isMobile ? 18 : 22} />, label: 'Active Reports', value: stats?.activeReports ?? '--', color: '#0071e3' },
            { icon: <AlertTriangle size={isMobile ? 18 : 22} />, label: 'Total Threats', value: stats?.totalThreats ?? '--', color: '#ff9500' },
            { icon: <Shield size={isMobile ? 18 : 22} />, label: 'Threats Blocked', value: stats?.threatsBlocked ?? '--', color: '#34c759' },
            { icon: <TrendingUp size={isMobile ? 18 : 22} />, label: 'Safety Score', value: stats?.safeScore ?? '--', color: '#af52de' },
          ].map((card, i) => (
            <FadeInUp key={card.label} delay={i * 0.1}>
              <StatCard icon={card.icon} label={card.label} value={card.value} color={card.color} isMobile={isMobile} isLoading={isLoading} />
            </FadeInUp>
          ))}
        </div>
      </StaggerContainer>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 24, marginBottom: isMobile ? 24 : 32 }}>
        {/* Reports This Week */}
        <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px 24px 20px', border: '1px solid #e8e8ed' }}>
          <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 4px 0' }}>Reports This Week</h3>
          <p style={{ fontSize: isMobile ? 13 : 14, color: '#86868b', margin: '0 0 16px 0' }}>
            Total: {stats?.totalThreats ?? 0} threats recorded
          </p>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 8, height: isMobile ? 100 : 140 }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: isMobile ? 70 : 100, borderRadius: '4px 4px 3px 3px', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease-in-out infinite' }} />
                  <div style={{ width: 20, height: 10, borderRadius: 3, background: '#eee' }} />
                </div>
              ))}
            </div>
          ) : barData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#86868b', fontSize: 14 }}>No threats recorded this week</div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 8, height: isMobile ? 100 : 140 }}>
              {barData.map((bar: { day: string; threats: number }) => {
                const pct = maxBarValue > 0 ? (bar.threats / maxBarValue) * 100 : 0;
                return (
                  <div key={bar.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b' }}>{bar.threats}</div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '100%', borderRadius: '4px 4px 3px 3px',
                        background: 'linear-gradient(180deg, #ff9500 0%, #ffb84d 100%)',
                        maxHeight: isMobile ? 70 : 100, minHeight: 6,
                        transition: 'height 0.5s',
                      }}
                    />
                    <div style={{ fontSize: isMobile ? 10 : 12, color: '#86868b' }}>{bar.day}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pending Reports */}
        <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid #e8e8ed' }}>
          <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 16px 0' }}>Pending Reports</h3>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 12 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: isMobile ? '12px' : '12px 14px', borderRadius: 12, background: '#f5f5f7' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease-in-out infinite' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '60%', height: 14, borderRadius: 4, background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease-in-out infinite', marginBottom: 4 }} />
                    <div style={{ width: '30%', height: 11, borderRadius: 3, background: '#eee' }} />
                  </div>
                  <div style={{ width: 45, height: 20, borderRadius: 20, background: '#eee' }} />
                </div>
              ))}
            </div>
          ) : pendingReports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#86868b', fontSize: 14 }}>No pending reports</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 12 }}>
              {pendingReports.map((report: Report) => {
                const priority = priorityMeta(report.type);
                return (
                  <div
                    key={report.id}
                    style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: isMobile ? '12px' : '12px 14px', borderRadius: 12, background: '#f5f5f7', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#eee'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f5f5f7'}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${priority.iconColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: priority.iconColor, flexShrink: 0 }}>
                      {priority.label === 'High' ? <AlertTriangle size={14} /> : priority.label === 'Medium' ? <FileText size={14} /> : <Clock size={14} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: '#1d1d1f', lineHeight: 1.4 }}>
                        {report.description || report.type || 'Report'}
                      </div>
                      <div style={{ fontSize: 11, color: '#86868b', marginTop: 2 }}>{report.created_at || 'Recently'}</div>
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0,
                      background: priority.bg, color: priority.color,
                    }}>
                      {priority.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Actions */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid #e8e8ed' }}>
        <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 12px 0' }}>Recent Reports</h3>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 12 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: isMobile ? '10px 12px' : '12px 14px', borderRadius: 12, background: '#f5f5f7' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eee' }} />
                <div style={{ flex: 1, height: 14, borderRadius: 4, background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease-in-out infinite' }} />
                <div style={{ width: 40, height: 11, borderRadius: 3, background: '#eee' }} />
              </div>
            ))}
          </div>
        ) : pendingReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#86868b', fontSize: 14 }}>No reports filed yet</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 12 }}>
            {pendingReports.map((report: Report) => (
              <div key={report.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: isMobile ? '10px 12px' : '12px 14px', borderRadius: 12, background: '#f5f5f7' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0071e3', flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: isMobile ? 13 : 14, color: '#1d1d1f' }}>{report.description || report.type || 'Report'}</div>
                <div style={{ fontSize: 11, color: '#86868b', flexShrink: 0 }}>{report.created_at || 'Recently'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
