import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout/DashboardLayout';
import { useIsMobile } from '../lib/useIsMobile';
import { useAuth } from '../lib/auth';
import { useAppTheme } from '../lib/theme';
import { Shield, Moon, Sun, ChevronRight, AlertTriangle } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { theme, toggleTheme } = useAppTheme();
  const isMobile = useIsMobile(768);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ 'Threat Alerts': true, 'Weekly Reports': true, 'Kindness Rewards': false, 'Product Updates': true });

  const handleSaveProfile = () => {
    updateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sectionStyle: React.CSSProperties = { background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: 12, overflow: 'hidden', marginBottom: isMobile ? 12 : 16 };
  const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '12px 16px' : '14px 20px', borderBottom: '1px solid #f5f5f7', minHeight: isMobile ? 48 : 52 };
  const rowLastStyle: React.CSSProperties = { ...rowStyle, borderBottom: 'none' };
  const labelStyle: React.CSSProperties = { fontSize: isMobile ? 13 : 14, color: '#1d1d1f', fontWeight: 500 };
  const subStyle: React.CSSProperties = { fontSize: isMobile ? 11 : 12, color: '#86868b', marginTop: 2 };

  return (
    <DashboardLayout>
      <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1d1d1f', marginBottom: 4, letterSpacing: '-0.02em' }}>Settings</h1>
      <p style={{ fontSize: isMobile ? 13 : 14, color: '#6e6e73', marginBottom: isMobile ? 20 : 28 }}>Manage your account and preferences</p>

      {/* Profile */}
      <div style={sectionStyle}>
        <div style={{ padding: isMobile ? '10px 16px' : '14px 20px', borderBottom: '1px solid #e8e8ed', fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profile</div>
        <div style={rowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
            <div style={{ width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius: '50%', background: '#0071e3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 14 : 16, fontWeight: 700, flexShrink: 0 }}>{user?.name?.charAt(0) || 'U'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <input value={name} onChange={e => setName(e.target.value)} style={{ fontSize: isMobile ? 14 : 14, fontWeight: 600, color: '#1d1d1f', border: 'none', background: 'transparent', padding: 0, outline: 'none', width: '100%', maxWidth: isMobile ? 140 : 200 }} />
              <div style={subStyle}>Tap to change your name</div>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: '#86868b', flexShrink: 0 }} />
        </div>
        <div style={rowLastStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <input value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: '#1d1d1f', border: 'none', background: 'transparent', padding: 0, outline: 'none', width: '100%' }} />
            <div style={subStyle}>Email address</div>
          </div>
          <button onClick={handleSaveProfile}
            style={{ padding: isMobile ? '6px 14px' : '8px 16px', borderRadius: 8, fontSize: isMobile ? 12 : 13, fontWeight: 600, color: saved ? '#30d158' : '#0071e3', border: 'none', background: saved ? '#f0fff4' : '#f0f7ff', cursor: 'pointer', flexShrink: 0, minHeight: 36 }}>
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div style={sectionStyle}>
        <div style={{ padding: isMobile ? '10px 16px' : '14px 20px', borderBottom: '1px solid #e8e8ed', fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notifications</div>
        {(['Threat Alerts', 'Weekly Reports', 'Kindness Rewards', 'Product Updates'] as const).map((label, i) => {
          const subs: Record<string, string> = { 'Threat Alerts': 'Get notified when threats are detected', 'Weekly Reports': 'Receive weekly safety summaries', 'Kindness Rewards': 'Celebrate positive behavior', 'Product Updates': 'New features and improvements' };
          const enabled = notifications[label];
          return (
            <div key={label} style={i === 3 ? rowLastStyle : rowStyle}>
              <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
                <div style={labelStyle}>{label}</div>
                <div style={subStyle}>{subs[label]}</div>
              </div>
              <div onClick={() => setNotifications(prev => ({ ...prev, [label]: !prev[label] }))}
                style={{ width: isMobile ? 40 : 44, height: isMobile ? 22 : 24, borderRadius: 12, background: enabled ? '#30d158' : '#e8e8ed', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s' }}>
                <div style={{ width: isMobile ? 18 : 20, height: isMobile ? 18 : 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: enabled ? (isMobile ? 20 : 22) : 2, transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy */}
      <div style={sectionStyle}>
        <div style={{ padding: isMobile ? '10px 16px' : '14px 20px', borderBottom: '1px solid #e8e8ed', fontSize: 11, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Privacy & Security</div>
        {[
          { label: 'On-Device Processing', sub: 'All AI processing happens on your device', icon: Shield, color: '#30d158' },
          { label: 'Data Sharing', sub: 'Share anonymized data to improve safety', icon: Shield, color: '#6e6e73' },
          { label: 'Theme', sub: `Currently ${theme} mode`, icon: theme === 'light' ? Sun : Moon, color: '#0071e3', action: toggleTheme },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.label} style={i === 2 ? rowLastStyle : rowStyle} onClick={item.action}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: 10, background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={isMobile ? 14 : 16} style={{ color: item.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={labelStyle}>{item.label}</div>
                  <div style={subStyle}>{item.sub}</div>
                </div>
              </div>
              {item.action && <ChevronRight size={16} style={{ color: '#86868b', flexShrink: 0 }} />}
            </div>
          );
        })}
      </div>

      {/* Danger zone */}
      <div style={sectionStyle}>
        <div style={{ padding: isMobile ? '10px 16px' : '14px 20px', borderBottom: '1px solid #e8e8ed', fontSize: 11, fontWeight: 600, color: '#d32f2f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Danger Zone</div>
        <div style={rowLastStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
            <div style={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: 10, background: '#fff2f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={isMobile ? 14 : 16} style={{ color: '#d32f2f' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={labelStyle}>Delete Account</div>
              <div style={subStyle}>Permanently delete your account and all data</div>
            </div>
          </div>
          <button onClick={() => { if (confirm('Are you sure you want to delete your account?')) { logout(); window.location.href = '/'; } }}
            style={{ padding: isMobile ? '6px 14px' : '8px 16px', borderRadius: 8, fontSize: isMobile ? 12 : 13, fontWeight: 600, color: '#d32f2f', border: '1px solid #d32f2f', background: 'transparent', cursor: 'pointer', flexShrink: 0, minHeight: 36 }}>
            Delete
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
