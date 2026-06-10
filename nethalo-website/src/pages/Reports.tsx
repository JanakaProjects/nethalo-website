import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout/DashboardLayout';
import { useIsMobile } from '../lib/useIsMobile';
import { getReports, createReport } from '../lib/api';
import type { Report } from '../lib/api';
import { AlertTriangle, FileText, Plus, X, Loader2 } from 'lucide-react';

const reportTypes = ['Cyberbullying', 'Harassment', 'Threatening behavior', 'Hate speech', 'Other'];

const statusMeta = (report: Report) => {
  const d = new Date(report.created_at || Date.now());
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days < 1) return { label: 'New', bg: '#e8f0fe', color: 'var(--color-brand-shield)' };
  if (days < 3) return { label: 'In Review', bg: '#fff3e0', color: '#ff9500' };
  return { label: 'Pending', bg: '#fff0ee', color: '#ff3b30' };
};

export const Reports: React.FC = () => {
  const isMobile = useIsMobile(768);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [targetName, setTargetName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReports(data.reports);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!type) return;
    setSubmitting(true);
    try {
      await createReport(type, description || undefined, targetName || undefined);
      setType('');
      setDescription('');
      setTargetName('');
      setShowForm(false);
      loadReports();
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 24 : 32 }}>
        <div>
          <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Reports</h1>
          <p style={{ fontSize: isMobile ? 14 : 16, color: 'var(--color-text-secondary)', marginTop: 6 }}>Submit and track your reports</p>
        </div>
        <button onClick={() => setShowForm(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 9999, border: 'none', background: '#ff9500', color: 'var(--color-text-inverse)', fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}>
          <Plus size={18} />{!isMobile && 'New Report'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 16 : 24, border: '1px solid var(--color-border-light)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>Submit a Report</h3>
            <button onClick={() => setShowForm(false)} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--color-bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', minHeight: 44, minWidth: 44 }}><X size={18} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border-medium)', fontSize: 15, color: 'var(--color-text-primary)', background: 'var(--color-bg-elevated)', minHeight: 44, appearance: 'none', cursor: 'pointer', position: 'relative' }}>
              <option value="">Select type...</option>
              {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input value={targetName} onChange={e => setTargetName(e.target.value)} placeholder="Target person/platform (optional)" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border-medium)', fontSize: 15, color: 'var(--color-text-primary)', minHeight: 44, boxSizing: 'border-box' }} />
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the incident..." style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border-medium)', fontSize: 15, color: 'var(--color-text-primary)', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5, boxSizing: 'border-box' }} />
            <button onClick={handleSubmit} disabled={!type || submitting}
              style={{ marginTop: 4, padding: '12px 24px', borderRadius: 12, border: 'none', background: type && !submitting ? '#ff9500' : 'var(--color-bg-tertiary)', color: type && !submitting ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)', fontSize: 15, fontWeight: 600, cursor: type && !submitting ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 8, minHeight: 44 }}>
              {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><AlertTriangle size={16} /> Submit Report</>}
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 16 : 20, border: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '30%', height: 14, borderRadius: 4, background: '#f0f0f0', marginBottom: 8 }} />
              <div style={{ width: '60%', height: 12, borderRadius: 4, background: '#f0f0f0' }} />
            </div>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-secondary)' }}>
          <FileText size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No reports yet</div>
          <div style={{ fontSize: 14 }}>Submit your first report to track it here</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reports.map((report, i) => {
            const status = statusMeta(report);
            return (
              <motion.div key={report.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 16 : 20, border: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: status.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>{report.type}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{report.description || 'No description'} {report.target_name ? `· ${report.target_name}` : ''}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap', background: status.bg, color: status.color }}>{status.label}</div>
              </motion.div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};