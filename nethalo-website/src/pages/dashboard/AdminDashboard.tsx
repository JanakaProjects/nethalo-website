import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { StaggerContainer } from '../../components/ui/motion/StaggerContainer';
import { FadeInUp } from '../../components/ui/motion/FadeInUp';
import { useIsMobile } from '../../lib/useIsMobile';
import { useAdminData } from '../../lib/useDashboardData';
import {
  Activity, AlertTriangle, Users, Settings, FileText,
  Megaphone, Lock, Download,
} from 'lucide-react';

type AdminTab = 'overview' | 'incidents' | 'users' | 'settings' | 'reports';

const AdminDashboard: React.FC = () => {
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const {
    stats = null,
    recentActivity = [],
    isLoading,
    error,
  } = useAdminData();

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Activity size={18} /> },
    { key: 'incidents', label: 'Incidents', icon: <AlertTriangle size={18} /> },
    { key: 'users', label: 'Users', icon: <Users size={18} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    { key: 'reports', label: 'Reports', icon: <FileText size={18} /> },
  ];

  const mockIncidents = [
    { id: 1, user: 'Mike R.', time: '10m ago', platform: 'Discord', type: 'Bullying', status: 'Pending', content: "You're genuinely useless..." },
    { id: 2, user: 'Sarah L.', time: '45m ago', platform: 'Instagram', type: 'Doxxing', status: 'Auto-Blocked', content: 'Address detected in img...' },
  ];

  const mockUsers = [
    { name: 'Alex Chen', apps: 'Insta, TikTok', status: 'Active', risk: 'Low' },
    { name: 'Mike Ross', apps: 'Discord', status: 'Flagged', risk: 'High' },
    { name: 'Aisha Khan', apps: 'Instagram', status: 'Active', risk: 'Low' },
    { name: 'Daniel Park', apps: 'TikTok, Snapchat', status: 'Warning', risk: 'Medium' },
  ];

  const platformRisk = [
    { name: 'Instagram', risk: 80, level: 'High Risk', color: '#ef4444' },
    { name: 'TikTok', risk: 40, level: 'Medium Risk', color: '#f59e0b' },
    { name: 'Discord', risk: 25, level: 'Low Risk', color: '#22c55e' },
  ];

  const renderOverview = () => (
    <StaggerContainer>
      <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>System Health</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 16, marginBottom: isMobile ? 20 : 28 }}>
        {[
          { label: 'Active Users', value: stats?.connectedChildren ?? '2,841', color: '#3b82f6' },
          { label: 'Critical Alerts', value: stats?.totalThreats ?? '3', color: '#ef4444' },
          { label: 'Threats Blocked', value: stats?.threatsBlocked ?? '14,205', color: '#22c55e' },
          { label: 'Safety Score', value: stats?.safeScore ?? '87', color: '#a855f7' },
        ].map((card, i) => (
          <FadeInUp key={card.label} delay={i * 0.08}>
            <div style={{ borderRadius: 16, padding: isMobile ? 16 : 20, background: '#ffffff', border: '1px solid #e8e8ed', borderLeft: `4px solid ${card.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{isLoading ? '--' : card.value}</div>
            </div>
          </FadeInUp>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24, marginBottom: isMobile ? 16 : 24 }}>
        <FadeInUp delay={0.3}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 24, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Traffic Analysis</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 10, height: isMobile ? 120 : 160 }}>
              {(recentActivity.length > 0 ? recentActivity.slice(0, 7) : [
                { severity: 'high' }, { severity: 'low' }, { severity: 'medium' }, { severity: 'high' }, { severity: 'low' }, { severity: 'medium' }, { severity: 'high' },
              ]).map((a: any, i: number) => {
                const vals: Record<string, number> = { critical: 90, high: 70, medium: 40, low: 20 };
                const pct = vals[a.severity] || 50;
                const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'];
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                      style={{ width: '100%', borderRadius: 4, background: 'linear-gradient(180deg, #3b82f6 0%, #93c5fd 100%)', minHeight: 6 }}
                    />
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{labels[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 24, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Network Threat Map</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>High volume of flags from Instagram this week.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {platformRisk.map((p) => (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontWeight: 600, color: p.color }}>{p.level}</span>
                  </div>
                  <div style={{ width: '100%', height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.risk}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: '100%', borderRadius: 4, background: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </StaggerContainer>
  );

  const renderIncidents = () => (
    <StaggerContainer>
      <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>Live Incident Command</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {mockIncidents.map((inc) => (
          <FadeInUp key={inc.id} delay={0.05}>
            <div style={{ borderRadius: 16, padding: isMobile ? 16 : 20, background: '#ffffff', border: '1px solid #e8e8ed', borderLeft: `4px solid ${inc.status === 'Pending' ? '#ef4444' : '#22c55e'}`, display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 6, background: '#f1f5f9', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}>{inc.type}</span>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>{inc.time} via {inc.platform}</span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>{inc.user}</h4>
                <p style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', margin: 0 }}>&quot;{inc.content}&quot;</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#f1f5f9', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}>
                  Dismiss
                </button>
                <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#3b82f6', fontSize: 12, fontWeight: 600, color: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
                  onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}>
                  Investigate
                </button>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </StaggerContainer>
  );

  const renderUsers = () => (
    <StaggerContainer>
      <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>User Management</h2>
      <FadeInUp delay={0}>
        <div style={{ borderRadius: 16, background: '#ffffff', border: '1px solid #e8e8ed', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['User', 'Apps', 'Status', 'Risk'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e8e8ed' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{u.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{u.apps}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: u.status === 'Active' ? '#16a34a' : u.status === 'Flagged' ? '#dc2626' : '#f59e0b' }}>{u.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{u.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );

  const renderSettings = () => (
    <StaggerContainer>
      <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>Policy Configuration</h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
        <FadeInUp delay={0}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 28, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <Settings size={20} style={{ color: '#3b82f6' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>AI Sensitivity</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Bullying Detection', value: 85 },
                { label: 'Profanity Filter', value: 60 },
                { label: 'Self-Harm Alerts', value: 95 },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6' }}>{s.value}%</span>
                  </div>
                  <div style={{ position: 'relative', height: 6, borderRadius: 3, background: '#f1f5f9' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${s.value}%`, borderRadius: 3, background: '#3b82f6', transition: 'width 0.3s' }} />
                    <input type="range" min={0} max={100} defaultValue={s.value} style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 28, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <Activity size={20} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Operation Hours</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, background: '#f8fafc' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>24/7 Monitoring</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>Keep AI active at all times</div>
                </div>
                <div style={{ width: 44, height: 24, borderRadius: 12, background: '#22c55e', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, background: '#f8fafc' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Campus Geo-Fence</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>Only monitor on school wifi</div>
                </div>
                <div style={{ width: 44, height: 24, borderRadius: 12, background: '#e2e8f0', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </StaggerContainer>
  );

  const renderReports = () => (
    <StaggerContainer>
      <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>Reports</h2>
      <FadeInUp delay={0}>
        <div style={{ borderRadius: 20, padding: isMobile ? 20 : 28, background: '#ffffff', border: '1px solid #e8e8ed' }}>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Export school-wide safety reports for compliance, parent meetings, or internal review.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Monthly Briefing', desc: 'Full threat and safety summary', icon: <FileText size={20} /> },
              { label: 'Incident Log', desc: 'Detailed incident timeline', icon: <AlertTriangle size={20} /> },
              { label: 'Student Export', desc: 'Per-student safety report', icon: <Users size={20} /> },
            ].map((r) => (
              <div key={r.label} style={{ padding: 20, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#eff6ff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}>
                <div style={{ color: '#3b82f6', marginBottom: 10 }}>{r.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: 'none', background: '#3b82f6', color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}>
            <Download size={16} /> Export Monthly Briefing
          </button>
        </div>
      </FadeInUp>
    </StaggerContainer>
  );

  return (
    <DashboardLayout>
      <div style={{ marginBottom: isMobile ? 20 : 28 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Admin Command</h1>
        <p style={{ fontSize: isMobile ? 13 : 15, color: 'var(--color-text-secondary)', marginTop: 6 }}>School-wide safety oversight</p>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', borderRadius: 12, background: '#fff0ee', color: '#ff3b30', fontSize: 14, marginBottom: 20 }}>{error}</div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: isMobile ? 20 : 28, overflowX: 'auto', paddingBottom: 4 }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s',
            background: activeTab === tab.key ? '#3b82f6' : '#f1f5f9',
            color: activeTab === tab.key ? 'white' : '#64748b',
          }}>
            {tab.icon} {tab.label}
          </button>
        ))}
        <button onClick={() => {}} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 12, border: '1px solid #fef3c7', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s',
          background: '#fffbeb', color: '#d97706',
        }}>
          <Megaphone size={18} /> Broadcast
        </button>
        <button onClick={() => {}} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 12, border: '1px solid #fecaca', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s',
          background: '#fef2f2', color: '#dc2626',
        }}>
          <Lock size={18} /> Lockdown
        </button>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'incidents' && renderIncidents()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'settings' && renderSettings()}
      {activeTab === 'reports' && renderReports()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
