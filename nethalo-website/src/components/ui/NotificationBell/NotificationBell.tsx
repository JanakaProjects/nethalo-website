import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, AlertTriangle, Shield } from 'lucide-react';

interface Notification {
  id: string;
  type: 'threat' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationBell: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockNotifications: Notification[] = [
      { id: '1', type: 'threat', title: 'Threat Detected', message: 'Hate speech detected on Instagram comment', time: '2 min ago', read: false },
      { id: '2', type: 'threat', title: 'Harassment Blocked', message: 'Bullying message blocked on TikTok', time: '15 min ago', read: false },
      { id: '3', type: 'info', title: 'Weekly Report', message: 'Your weekly safety report is ready', time: '1 hour ago', read: true },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const bellSize = isMobile ? 18 : 20;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? 'var(--color-bg-hover)' : 'none', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer', transition: 'background 0.15s', minHeight: 40 }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'var(--color-bg-hover)'; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'none'; }}>
        <Bell size={bellSize} />
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: 6, right: 6, width: 16, height: 16, borderRadius: '50%', background: '#ff3b30', color: '#ffffff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: isMobile ? 300 : 360, background: 'var(--color-bg-elevated)', borderRadius: 14, border: '1px solid var(--color-border-light)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--color-border-light)' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>Notifications</span>
            <button onClick={() => setIsOpen(false)} style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={14} /></button>
          </div>
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>No notifications</div>
            ) : notifications.map(n => (
              <button key={n.id} onClick={() => markAsRead(n.id)}
                style={{ display: 'flex', gap: 12, width: '100%', padding: '12px 16px', background: n.read ? 'transparent' : 'var(--color-bg-secondary)', border: 'none', borderLeft: n.read ? '3px solid transparent' : '3px solid var(--color-brand-shield)', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : 'var(--color-bg-secondary)'}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: n.type === 'threat' ? '#fff0ee' : 'var(--color-brand-shield-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.type === 'threat' ? '#ff3b30' : 'var(--color-brand-shield)', flexShrink: 0 }}>
                  {n.type === 'threat' ? <AlertTriangle size={16} /> : <Shield size={16} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>{n.time}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
