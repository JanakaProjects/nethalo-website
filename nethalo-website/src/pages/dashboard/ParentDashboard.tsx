import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout/DashboardLayout';
import { StaggerContainer } from '../../components/ui/motion/StaggerContainer';
import { FadeInUp } from '../../components/ui/motion/FadeInUp';
import { useIsMobile } from '../../lib/useIsMobile';
import { useAuth } from '../../lib/auth';
import { useParentData } from '../../lib/useDashboardData';
import {
  Activity, Sliders, MessageSquareHeart, Shield,
  AlertTriangle, Sparkles, Clock,
} from 'lucide-react';

type ParentTab = 'overview' | 'controls' | 'guidance';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { stats, children, weeklyActivity, error } = useParentData(user?.id);
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState<ParentTab>('overview');
  const [parentMode, setParentMode] = useState<'tolerable' | 'severe'>('tolerable');
  const [guidanceGenerated, setGuidanceGenerated] = useState(false);

  const currentChild = children[0] || { name: 'Your Child', status: 'unknown', safe_score: 0 };
  const safeScore = currentChild.safe_score || stats?.safeScore || 98;
  const threatsBlocked = stats?.threatsBlocked || 3;

  const tabs: { key: ParentTab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Activity size={18} /> },
    { key: 'controls', label: 'Controls', icon: <Sliders size={18} /> },
    { key: 'guidance', label: 'Family Guidance', icon: <MessageSquareHeart size={18} /> },
  ];

  const renderOverview = () => (
    <StaggerContainer>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 16 : 24, marginBottom: isMobile ? 16 : 24 }}>
        <FadeInUp delay={0}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 32, background: '#f0fdf4', border: '1px solid #dcfce7', position: 'relative', overflow: 'hidden', minHeight: isMobile ? 180 : 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(34,197,94,0.08), transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', fontSize: 12, fontWeight: 600, color: '#16a34a', marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                Live Status
              </div>
              <h2 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>{currentChild.name} is Protected</h2>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Filters active. No critical threats detected today.</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Blocked</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{threatsBlocked}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Score</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#16a34a' }}>{safeScore}%</div>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 24, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Social Media Manager</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Instagram', 'TikTok'].map((app) => (
                <div key={app} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ padding: 6, borderRadius: 8, background: '#f1f5f9' }}>
                      <Activity size={14} style={{ color: '#475569' }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{app}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a' }}>Monitored</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp delay={0.2}>
        <div style={{ borderRadius: 20, padding: isMobile ? 20 : 24, background: '#ffffff', border: '1px solid #e8e8ed', marginBottom: isMobile ? 16 : 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Emotional Climate for {currentChild.name}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 10, height: isMobile ? 120 : 160, paddingTop: 8 }}>
            {(weeklyActivity.length > 0 ? weeklyActivity : [
              { day: 'Mon', threats: 12 }, { day: 'Tue', threats: 8 }, { day: 'Wed', threats: 15 },
              { day: 'Thu', threats: 5 }, { day: 'Fri', threats: 10 }, { day: 'Sat', threats: 3 }, { day: 'Sun', threats: 7 },
            ]).map((d, i) => {
              const val = d.threats || 10;
              const pct = Math.max((val / 20) * 100, 10);
              return (
                <div key={d.day || i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8' }}>{val}</div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    style={{ width: '100%', borderRadius: 6, background: 'linear-gradient(180deg, #3b82f6 0%, #93c5fd 100%)', minHeight: 6 }}
                  />
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.day || `Day ${i + 1}`}</div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInUp>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 24 }}>
        <FadeInUp delay={0.3}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 24, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Connected Children</h3>
            {children.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {children.map((child, i) => (
                  <div key={child.id || i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: '#f8fafc' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{child.name.charAt(0)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{child.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{child.grade || 'N/A'} · Score: {child.safe_score || 95}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center', padding: 16 }}>No children connected yet</p>
            )}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 24, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Recent Updates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { text: `${stats?.totalThreats || 0} total threats detected`, icon: <Shield size={14} />, color: '#3b82f6' },
                { text: `${stats?.threatsBlocked || 0} threats blocked automatically`, icon: <Shield size={14} />, color: '#22c55e' },
                { text: `${stats?.activeReports || 0} active reports`, icon: <AlertTriangle size={14} />, color: '#f59e0b' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#334155', lineHeight: 1.4 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </StaggerContainer>
  );

  const renderControls = () => (
    <StaggerContainer>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
        <FadeInUp delay={0}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 28, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Shield size={20} style={{ color: '#3b82f6' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Protection Mode</h3>
            </div>
            <div style={{ display: 'flex', borderRadius: 9999, padding: 4, background: '#f1f5f9', marginBottom: 24 }}>
              {(['tolerable', 'severe'] as const).map((mode) => (
                <button key={mode} onClick={() => setParentMode(mode)} style={{
                  flex: 1, padding: '10px 0', borderRadius: 9999, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                  background: parentMode === mode ? (mode === 'severe' ? '#dc2626' : '#3b82f6') : 'transparent',
                  color: parentMode === mode ? 'white' : '#94a3b8',
                }}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {parentMode === 'tolerable' ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, background: '#f8fafc' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Location Safety</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Alert if leaves school</div>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: '#3b82f6', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, background: '#fef2f2', border: '1px solid #fecaca' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>Strict Lockout</div>
                      <div style={{ fontSize: 12, color: '#dc2626' }}>Block apps after 8PM</div>
                    </div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, background: '#dc2626', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 12, background: '#fef2f2', border: '1px solid #fecaca' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>Post Limit</div>
                      <div style={{ fontSize: 12, color: '#dc2626' }}>Max 1 post/day</div>
                    </div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, background: '#dc2626', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 28, background: '#ffffff', border: '1px solid #e8e8ed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Clock size={20} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Digital Curfew</h3>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20, lineHeight: 1.5 }}>Set visualization of downtime hours. During these times, social apps will be blocked.</p>
            <div style={{ position: 'relative', height: 48, borderRadius: 24, background: '#f1f5f9', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 16px', marginBottom: 16 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '30%', background: 'rgba(99,102,241,0.3)' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '20%', background: 'rgba(99,102,241,0.3)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 1, fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>
                <span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>12AM</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start Time</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>10:00 PM</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>End Time</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>7:00 AM</div>
              </div>
            </div>
            <button style={{ width: '100%', marginTop: 16, padding: '12px 0', borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, fontWeight: 600, color: '#334155', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; }}>
              Edit Schedule
            </button>
          </div>
        </FadeInUp>
      </div>
    </StaggerContainer>
  );

  const renderGuidance = () => (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <StaggerContainer>
        <FadeInUp delay={0}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Sparkles size={28} style={{ color: '#3b82f6' }} />
            </div>
            <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>Family Guidance: {currentChild.name}</h2>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>AI-powered conversation starters based on recent digital sentiment.</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div style={{ borderRadius: 20, padding: isMobile ? 20 : 28, background: '#ffffff', border: '1px solid #e8e8ed', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Weekly Insight</h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                &quot;{currentChild.name} has been engaging with a lot of content related to academic stress this week. The sentiment analysis shows a dip in mood on Tuesday evenings.&quot;
              </p>
              <button onClick={() => setGuidanceGenerated(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: 'none', background: '#3b82f6', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}>
                <MessageSquareHeart size={16} /> Generate Talking Points
              </button>
              {guidanceGenerated && (
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: 16, borderRadius: 12, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Casual Approach</div>
                    <p style={{ fontSize: 14, color: '#334155', margin: 0, lineHeight: 1.5 }}>&quot;Hey, I noticed things seem pretty busy at school lately. How are you handling the workload?&quot;</p>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Direct Approach</div>
                    <p style={{ fontSize: 14, color: '#334155', margin: 0, lineHeight: 1.5 }}>&quot;I wanted to check in. NetHalo showed a bit of stress in the trends this week. Is there anything specific on your mind?&quot;</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeInUp>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
          <FadeInUp delay={0.2}>
            <div style={{ borderRadius: 16, padding: 20, background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Digital Safety 101</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>A guide for parents on the latest trends.</div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div style={{ borderRadius: 16, padding: 20, background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Crisis Resources</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Who to call when things get tough.</div>
            </div>
          </FadeInUp>
        </div>
      </StaggerContainer>
    </div>
  );

  return (
    <DashboardLayout>
      <div style={{ marginBottom: isMobile ? 20 : 28 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Parent Hub</h1>
        <p style={{ fontSize: isMobile ? 13 : 15, color: 'var(--color-text-secondary)', marginTop: 6 }}>Monitor and protect your child&apos;s digital world</p>
      </div>

      {error && (
        <div style={{ padding: 12, borderRadius: 12, background: '#fff0ee', color: '#ff3b30', fontSize: 14, marginBottom: 16 }}>{error}</div>
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
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'controls' && renderControls()}
      {activeTab === 'guidance' && renderGuidance()}
    </DashboardLayout>
  );
};

export default ParentDashboard;
