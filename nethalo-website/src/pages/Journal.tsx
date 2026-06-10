import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout/DashboardLayout';
import { useIsMobile } from '../lib/useIsMobile';
import { useAuth } from '../lib/auth';
import { getJournalEntries, createJournalEntry, deleteJournalEntry } from '../lib/api';
import type { JournalEntry } from '../lib/api';
import { BookOpen, Plus, Trash2, X, Smile, Meh, Frown, Loader2 } from 'lucide-react';

const moodOptions = [
  { emoji: <Smile size={20} />, label: 'Happy', value: 'happy', color: '#34c759' },
  { emoji: <Meh size={20} />, label: 'Neutral', value: 'neutral', color: '#ff9500' },
  { emoji: <Frown size={20} />, label: 'Sad', value: 'sad', color: '#ff3b30' },
  { emoji: <Smile size={20} style={{ opacity: 0.6 }} />, label: 'Anxious', value: 'anxious', color: '#af52de' },
  { emoji: <Smile size={20} style={{ opacity: 0.4 }} />, label: 'Angry', value: 'angry', color: '#ff3b30' },
];

const moodEmojis: Record<string, React.ReactNode> = {
  happy: <Smile size={16} style={{ color: '#34c759' }} />,
  neutral: <Meh size={16} style={{ color: '#ff9500' }} />,
  sad: <Frown size={16} style={{ color: '#ff3b30' }} />,
  anxious: <Smile size={16} style={{ color: '#af52de', opacity: 0.6 }} />,
  angry: <Smile size={16} style={{ color: '#ff3b30', opacity: 0.4 }} />,
};

export const Journal: React.FC = () => {
  const isMobile = useIsMobile(768);
  useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (showNew && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showNew]);

  const loadEntries = async () => {
    try {
      const data = await getJournalEntries();
      setEntries(data.entries);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      await createJournalEntry(content.trim(), mood || undefined);
      setContent('');
      setMood('');
      setShowNew(false);
      loadEntries();
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJournalEntry(id);
      setEntries(prev => prev.filter(e => String(e.id) !== id));
    } catch {
    }
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 24 : 32 }}>
        <div>
          <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Journal</h1>
          <p style={{ fontSize: isMobile ? 14 : 16, color: 'var(--color-text-secondary)', marginTop: 6 }}>Your private thoughts, always secure</p>
        </div>
        <button onClick={() => setShowNew(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 9999, border: 'none', background: 'var(--color-brand-shield)', color: 'var(--color-text-inverse)', fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}>
          <Plus size={18} />
          {!isMobile && 'New Entry'}
        </button>
      </div>

      {showNew && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 16 : 24, border: '1px solid var(--color-border-light)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>New Entry</h3>
            <button onClick={() => setShowNew(false)} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--color-bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', minHeight: 44, minWidth: 44 }}><X size={18} /></button>
          </div>
          <textarea ref={textareaRef} value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="How are you feeling today?" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--color-border-medium)', fontSize: 15, color: 'var(--color-text-primary)', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5, boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {moodOptions.map(m => (
              <button key={m.value} onClick={() => setMood(m.value === mood ? '' : m.value)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9999, border: `1px solid ${mood === m.value ? m.color : 'var(--color-border-medium)'}`, background: mood === m.value ? `${m.color}15` : 'var(--color-bg-elevated)', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: mood === m.value ? m.color : 'var(--color-text-secondary)', minHeight: 36, transition: 'all 0.2s' }}>
                {m.emoji}
                {m.label}
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} disabled={!content.trim() || submitting}
            style={{ marginTop: 16, padding: '12px 24px', borderRadius: 12, border: 'none', background: content.trim() && !submitting ? '#af52de' : 'var(--color-bg-tertiary)', color: content.trim() && !submitting ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)', fontSize: 15, fontWeight: 600, cursor: content.trim() && !submitting ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, transition: 'all 0.2s' }}>
            {submitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><BookOpen size={16} /> Save Entry</>}
          </button>
        </motion.div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 16 : 24, border: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '40%', height: 14, borderRadius: 4, background: '#f0f0f0', marginBottom: 8 }} />
              <div style={{ width: '100%', height: 12, borderRadius: 4, background: '#f0f0f0', marginBottom: 4 }} />
              <div style={{ width: '80%', height: 12, borderRadius: 4, background: '#f0f0f0' }} />
            </div>
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-secondary)' }}>
          <BookOpen size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No entries yet</div>
          <div style={{ fontSize: 14 }}>Start writing your first journal entry</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              style={{ background: 'var(--color-bg-elevated)', borderRadius: 16, padding: isMobile ? 16 : 20, border: '1px solid var(--color-border-light)', position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {entry.mood && moodEmojis[entry.mood]}
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</span>
                </div>
                <button onClick={() => handleDelete(String(entry.id))} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#fff2f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff3b30', opacity: 0, transition: 'opacity 0.2s', minHeight: 44, minWidth: 44 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
                  <Trash2 size={14} />
                </button>
              </div>
              <div style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.6, color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap' }}>{entry.content}</div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};