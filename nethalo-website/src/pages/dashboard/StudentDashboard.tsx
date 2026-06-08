import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { StaggerContainer } from '../../components/ui/motion/StaggerContainer';
import { FadeInUp } from '../../components/ui/motion/FadeInUp';
import StatCard from '../../components/ui/StatCard/StatCard';
import { useIsMobile } from '../../lib/useIsMobile';
import { useAuth } from '../../lib/auth';
import { useStudentData } from '../../lib/useDashboardData';
import { Shield, AlertTriangle, MessageCircle, FileText, BookOpen, Activity, Users, TrendingUp, X, ExternalLink, Phone, Mail, ArrowRight } from 'lucide-react';

const SafetyScoreRing: React.FC<{ score: number; isMobile: boolean }> = ({ score, isMobile }) => {
  const size = isMobile ? 90 : 110;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#34c759' : score >= 60 ? '#ff9500' : '#ff3b30';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e8e8ed" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ fontSize: isMobile ? 24 : 30, fontWeight: 700, color: '#1d1d1f' }}
        >
          {score}
        </motion.span>
        <span style={{ fontSize: 11, color: '#86868b', marginTop: -2 }}>Safe</span>
      </div>
    </div>
  );
};

const getBarColor = (value: number) => {
  if (value <= 40) return '#34c759';
  if (value <= 70) return '#ff9500';
  return '#ff3b30';
};

const StudentDashboard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { user } = useAuth();
  const { safeScore, stats, weeklyActivity, recentActivity, isLoading, error } = useStudentData(user?.id);
  const isMobile = useIsMobile(768);

  const actionIconSize = isMobile ? 20 : 22;

  const actions = [
    { icon: <AlertTriangle size={actionIconSize} />, label: 'Report a Concern', desc: 'Submit an anonymous report', color: '#ff9500', action: 'report' },
    { icon: <MessageCircle size={actionIconSize} />, label: 'Talk to Someone', desc: 'Connect with a counselor', color: '#0071e3', action: 'talk' },
    { icon: <FileText size={actionIconSize} />, label: 'View Your Reports', desc: 'Track your submissions', color: '#34c759', action: 'view' },
    { icon: <BookOpen size={actionIconSize} />, label: 'Start a Journal', desc: 'Write private entries', color: '#af52de', action: 'journal' },
  ];

  const barData = weeklyActivity.length > 0
    ? weeklyActivity.map(d => ({ label: d.day.slice(5), value: d.threats }))
    : [];
  const maxBarValue = barData.length > 0 ? Math.max(...barData.map(b => b.value)) : 1;
  const barScale = maxBarValue > 90 ? 1 : 90 / Math.max(maxBarValue, 1);

  const activityItems = recentActivity.length > 0
    ? recentActivity.slice(0, 5).map(a => ({
        text: a.message,
        time: a.time ? new Date(a.time).toLocaleDateString() : 'recent',
        icon: <Shield size={14} />,
        color: a.severity === 'critical' ? '#ff3b30' : a.severity === 'high' ? '#ff9500' : '#0071e3',
      }))
    : [{ text: 'No recent activity', time: '', icon: <Activity size={14} />, color: '#86868b' }];

  return (
    <DashboardLayout>
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1d1d1f', margin: 0, letterSpacing: '-0.02em' }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Student'}
        </h1>
        <p style={{ fontSize: isMobile ? 14 : 16, color: '#86868b', marginTop: 6 }}>Here&apos;s your current safety overview</p>
      </div>

      <StaggerContainer>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: isMobile ? 12 : 16, marginBottom: isMobile ? 24 : 32 }}>
          <FadeInUp delay={0}>
            <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px', border: '1px solid #e8e8ed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? 120 : 140, position: 'relative' }}>
              <SafetyScoreRing score={safeScore} isMobile={isMobile} />
              <div style={{ fontSize: isMobile ? 13 : 14, color: '#86868b', marginTop: 8 }}>Safety Score</div>
            </div>
          </FadeInUp>
          {[
            { icon: <Activity size={isMobile ? 18 : 22} />, label: 'Reports Filed', value: stats?.activeReports ?? '-', color: '#0071e3' },
            { icon: <Users size={isMobile ? 18 : 22} />, label: 'Support Contacts', value: stats?.connectedChildren ?? '-', color: '#af52de' },
            { icon: <TrendingUp size={isMobile ? 18 : 22} />, label: 'Days Safe', value: stats?.safeScore ? `${Math.round(stats.safeScore / 10)}` : '-', trend: '↑ 3', trendUp: true, color: '#ff9500' },
          ].map((card, i) => (
            <FadeInUp key={card.label} delay={(i + 1) * 0.1}>
              <StatCard icon={card.icon} label={card.label} value={card.value} trend={card.trend} trendUp={card.trendUp} color={card.color} isMobile={isMobile} isLoading={isLoading} />
            </FadeInUp>
          ))}
        </div>
      </StaggerContainer>

      {error && (
        <div style={{ padding: 12, borderRadius: 12, background: '#fff0ee', color: '#ff3b30', fontSize: 14, marginBottom: 16 }}>{error}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 24, marginBottom: isMobile ? 24 : 32 }}>
        <div style={{ background: '#ffffff', borderRadius: 16, padding: isMobile ? '16px' : '24px 24px 20px', border: '1px solid #e8e8ed' }}>
          <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 4px 0' }}>Weekly Activity</h3>
          <p style={{ fontSize: isMobile ? 13 : 14, color: '#86868b', margin: '0 0 16px 0' }}>Interactions flagged this week</p>
          {barData.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 8, height: isMobile ? 100 : 140 }}>
              {barData.map((bar, i) => {
                const scaledValue = Math.round(bar.value * barScale);
                const barColor = getBarColor(scaledValue);
                const isHighest = scaledValue === Math.round(maxBarValue * barScale);
                return (
                  <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#86868b' }}>{bar.value}</div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(scaledValue, 6)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '100%', borderRadius: '4px 4px 3px 3px',
                        background: barColor,
                        maxHeight: isMobile ? 70 : 100, minHeight: 6,
                        boxShadow: isHighest ? `0 0 12px ${barColor}66` : 'none',
                      }}
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
          <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 16px 0' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 14 }}>
            {activityItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: '#1d1d1f', lineHeight: 1.4 }}>{item.text}</div>
                  {item.time && <div style={{ fontSize: 11, color: '#86868b', marginTop: 2 }}>{item.time}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: '#1d1d1f', margin: '0 0 12px 0' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: isMobile ? 10 : 12 }}>
          {actions.map(action => (
            <button key={action.label} onClick={() => { if (action.action === 'talk') setActiveModal('talk'); else setActiveModal(action.action); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: isMobile ? 8 : 10, padding: isMobile ? '14px' : '20px', borderRadius: 16, border: '1px solid #e8e8ed', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left', minHeight: 44 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = action.color; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8e8ed'; }}>
              <div style={{ width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius: 10, background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.color }}>{action.icon}</div>
              <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1d1d1f' }}>{action.label}</div>
              <div style={{ fontSize: isMobile ? 12 : 13, color: '#86868b', lineHeight: 1.3 }}>{action.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {activeModal === 'report' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 12 : 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setActiveModal(null)} />
          <div style={{ position: 'relative', background: '#ffffff', borderRadius: 20, padding: isMobile ? 24 : 32, maxWidth: 480, width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#f5f5f7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b', minHeight: 44, minWidth: 44 }}><X size={18} /></button>
            <div style={{ width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: 12, background: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff9500', marginBottom: 16 }}><AlertTriangle size={isMobile ? 22 : 26} /></div>
            <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px 0' }}>Report a Concern</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: '#86868b', margin: '0 0 20px 0', lineHeight: 1.5 }}>Your report will remain anonymous. A school administrator will review it as soon as possible.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>Type of concern</label>
                <select style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, color: '#1d1d1f', background: '#fff', appearance: 'none', cursor: 'pointer', minHeight: 44 }}>
                  <option>Cyberbullying</option>
                  <option>Harassment</option>
                  <option>Threatening behavior</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea rows={4} placeholder="Describe what happened..." style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, color: '#1d1d1f', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }} />
              </div>
              <button style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: '#0071e3', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48 }}
                onMouseEnter={e => e.currentTarget.style.background = '#0077ed'} onMouseLeave={e => e.currentTarget.style.background = '#0071e3'} onClick={() => setActiveModal(null)}>
                Submit Report <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'view' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 12 : 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setActiveModal(null)} />
          <div style={{ position: 'relative', background: '#ffffff', borderRadius: 20, padding: isMobile ? 24 : 32, maxWidth: 480, width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#f5f5f7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b', minHeight: 44, minWidth: 44 }}><X size={18} /></button>
            <div style={{ width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: 12, background: '#e8f8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34c759', marginBottom: 16 }}><FileText size={isMobile ? 22 : 26} /></div>
            <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px 0' }}>Your Reports</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: '#86868b', margin: '0 0 20px 0', lineHeight: 1.5 }}>Here are your submitted reports and their current status.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { id: '#1042', type: 'Cyberbullying', status: 'Resolved', date: 'May 28, 2026', color: '#34c759' },
                { id: '#1087', type: 'Harassment', status: 'In Review', date: 'Jun 2, 2026', color: '#ff9500' },
                { id: '#1123', type: 'Threatening behavior', status: 'Pending', date: 'Jun 5, 2026', color: '#ff3b30' },
              ].map((report, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 12, background: '#f5f5f7' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: report.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1d1d1f' }}>{report.type}</div>
                    <div style={{ fontSize: 12, color: '#86868b' }}>{report.id} · {report.date}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, padding: '3px 12px', borderRadius: 20, background: report.status === 'Resolved' ? '#e8f8e8' : report.status === 'In Review' ? '#fff3e0' : '#fff0ee', color: report.color, whiteSpace: 'nowrap' }}>{report.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'talk' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 12 : 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setActiveModal(null)} />
          <div style={{ position: 'relative', background: '#ffffff', borderRadius: 20, padding: isMobile ? 24 : 32, maxWidth: 480, width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#f5f5f7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b', minHeight: 44, minWidth: 44 }}><X size={18} /></button>
            <div style={{ width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: 12, background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3', marginBottom: 16 }}><MessageCircle size={isMobile ? 22 : 26} /></div>
            <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px 0' }}>Talk to Someone</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: '#86868b', margin: '0 0 20px 0', lineHeight: 1.5 }}>If you need immediate help, please reach out to one of these resources.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'School Counselor', sub: 'Mrs. Rodriguez', icon: <Users size={isMobile ? 18 : 20} />, color: '#0071e3', available: true },
                { label: 'Crisis Helpline', sub: 'Call or text 988', icon: <Phone size={isMobile ? 18 : 20} />, color: '#34c759', available: true },
                { label: 'Safe2Say', sub: 'Anonymous tip line', icon: <Mail size={isMobile ? 18 : 20} />, color: '#af52de', available: true },
              ].map((resource, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: isMobile ? '12px 14px' : '14px 16px', borderRadius: 12, background: '#f5f5f7', cursor: 'pointer', transition: 'all 0.2s', minHeight: 44 }}
                  onMouseEnter={e => e.currentTarget.style.background = '#eee'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f5f5f7'}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${resource.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: resource.color }}>{resource.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1d1d1f' }}>{resource.label}</div>
                    <div style={{ fontSize: 12, color: '#86868b' }}>{resource.sub}</div>
                  </div>
                  <ExternalLink size={16} style={{ color: '#86868b', flexShrink: 0 }} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#86868b', marginTop: 20, lineHeight: 1.5, textAlign: 'center' }}>If this is an emergency, please call 911 immediately.</p>
          </div>
        </div>
      )}

      {activeModal === 'journal' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 12 : 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setActiveModal(null)} />
          <div style={{ position: 'relative', background: '#ffffff', borderRadius: 20, padding: isMobile ? 24 : 32, maxWidth: 480, width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', border: 'none', background: '#f5f5f7', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b', minHeight: 44, minWidth: 44 }}><X size={18} /></button>
            <div style={{ width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: 12, background: '#f5e6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#af52de', marginBottom: 16 }}><BookOpen size={isMobile ? 22 : 26} /></div>
            <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px 0' }}>Start a Journal</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: '#86868b', margin: '0 0 20px 0', lineHeight: 1.5 }}>Write a private journal entry. Your thoughts are stored securely on your device.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>Today&apos;s entry</label>
                <textarea rows={6} placeholder="How are you feeling today?" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, color: '#1d1d1f', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }} />
              </div>
              <button style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: '#af52de', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48 }}
                onMouseEnter={e => e.currentTarget.style.background = '#c06cf0'} onMouseLeave={e => e.currentTarget.style.background = '#af52de'} onClick={() => setActiveModal(null)}>
                Save Entry <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;