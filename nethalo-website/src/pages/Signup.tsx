import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../lib/useIsMobile';
import { useAuth } from '../lib/auth';
import { Shield } from 'lucide-react';

type Tab = 'student' | 'parent' | 'admin';

const tabs: { key: Tab; label: string }[] = [
  { key: 'student', label: "I'm a Student" },
  { key: 'parent', label: "I'm a Parent" },
  { key: 'admin', label: "I'm a School" },
];

export const Signup: React.FC = () => {
  const [tab, setTab] = useState<Tab>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [childName, setChildName] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile(768);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Please fill in all required fields'); return; }
    setError('');
    setLoading(true);
    try {
      await signup({
        name, email, password, role: tab,
        ...(tab === 'student' ? { age: Number(age), school } : {}),
        ...(tab === 'parent' ? { childName } : {}),
        ...(tab === 'admin' ? { adminRole, school } : {}),
      });
      navigate(`/dashboard/${tab}`, { replace: true });
    } catch { setError('Something went wrong'); }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 44, padding: '0 14px', borderRadius: 10,
    border: '1px solid #d2d2d7', fontSize: 14, background: '#f5f5f7', color: '#1d1d1f', outline: 'none',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? '100vh' : 'calc(100vh - 44px)', background: '#f5f5f7', padding: isMobile ? 16 : 24 }}>
      <div style={{ maxWidth: 440, width: '100%', background: '#ffffff', borderRadius: 16, padding: isMobile ? 24 : 40, border: '1px solid #d2d2d7' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 24 }}>
          <Shield size={isMobile ? 32 : 40} style={{ color: '#0071e3', marginBottom: 12 }} />
          <h1 style={{ fontSize: isMobile ? 22 : 24, fontWeight: 700, color: '#1d1d1f', marginBottom: 4 }}>Create your account</h1>
          <p style={{ fontSize: isMobile ? 14 : 14, color: '#6e6e73' }}>Choose your role to get started</p>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: isMobile ? 20 : 24, background: '#f5f5f7', borderRadius: 10, padding: 4 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                flex: 1, padding: isMobile ? '8px 4px' : '10px 8px', borderRadius: 8, fontSize: isMobile ? 12 : 13, fontWeight: 600,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s', minHeight: 44,
                background: tab === t.key ? '#ffffff' : 'transparent',
                color: tab === t.key ? '#1d1d1f' : '#6e6e73',
                boxShadow: tab === t.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>
              {tab === 'student' ? 'Full Name' : tab === 'parent' ? 'Your Name' : 'Your Name'} *
            </label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder={tab === 'admin' ? 'Dr. Sarah Chen' : 'Your full name'} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>Email *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>Password *</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password (min 8 characters)" required minLength={8} style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
          </div>

          {tab === 'student' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>Age</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="13-19" min={13} max={19} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>School Name</label>
                <input value={school} onChange={e => setSchool(e.target.value)} placeholder="e.g. Manchester Academy" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
              </div>
            </>
          )}

          {tab === 'parent' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>Child's Name (optional)</label>
              <input value={childName} onChange={e => setChildName(e.target.value)} placeholder="e.g. Maya" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
            </div>
          )}

          {tab === 'admin' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>School Name *</label>
                <input value={school} onChange={e => setSchool(e.target.value)} placeholder="e.g. Brighton College" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#0071e3'} onBlur={e => e.target.style.borderColor = '#d2d2d7'} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>Role *</label>
                <select value={adminRole} onChange={e => setAdminRole(e.target.value)} required style={{ ...inputStyle, appearance: 'none' }}>
                  <option value="">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="counselor">School Counselor</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </>
          )}

          {error && <p style={{ fontSize: 13, color: '#d32f2f', marginBottom: 16 }}>{error}</p>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', height: 44, borderRadius: 9999, fontSize: 15, fontWeight: 600, color: 'white', background: loading ? '#6e6e73' : '#0071e3', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', minHeight: 44 }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#0077ed'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0071e3'; }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6e6e73' }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};
