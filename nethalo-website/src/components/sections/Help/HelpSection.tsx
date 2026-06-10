import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, ChevronDown, Shield, AlertTriangle,
  MessageCircle, FileText, BookOpen, Activity, X,
  TrendingUp, Users, Info
} from 'lucide-react';

interface HelpItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const helpItems: HelpItem[] = [
  {
    icon: <Shield size={20} />,
    title: 'Dashboard Overview',
    description: 'This is your command center. The Safety Score reflects how safe your online environment is based on recent activity. The weekly activity chart shows flagged interactions, and recent activity tracks your actions.',
    color: '#0071e3',
    bgColor: '#e0f2fe',
  },
  {
    icon: <AlertTriangle size={20} />,
    title: 'Report a Concern',
    description: 'If you experience or witness cyberbullying, harassment, or any concerning behavior, click this button to submit a confidential report. School administrators will review it promptly. Your identity is protected.',
    color: '#f59e0b',
    bgColor: '#fff3e0',
  },
  {
    icon: <MessageCircle size={20} />,
    title: 'Talk to Someone',
    description: 'Feeling overwhelmed? Connect with a school counselor, crisis helpline, or use the anonymous tip line. Help is available 24/7. Remember, speaking up is a sign of strength, not weakness.',
    color: '#0071e3',
    bgColor: '#e0f2fe',
  },
  {
    icon: <FileText size={20} />,
    title: 'View Your Reports',
    description: 'Track the status of any reports you have submitted. You can see whether they are pending, in review, or resolved. Export your data anytime for your records.',
    color: '#10b981',
    bgColor: '#e8f8e8',
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Start a Journal',
    description: 'Your private journal is a safe space to write down your thoughts and feelings. Entries are stored securely on your device and are not accessible by anyone else including school staff.',
    color: '#af52de',
    bgColor: '#f5e6ff',
  },
  {
    icon: <Activity size={20} />,
    title: 'Safety Score',
    description: 'Your Safety Score (0-100) estimates how safe your online environment is. A higher score means fewer threats detected. Scores below 60 indicate concerning activity that may need attention.',
    color: '#0071e3',
    bgColor: '#e0f2fe',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Weekly Activity',
    description: 'The weekly activity chart shows how many potentially harmful interactions were flagged each day. Higher bars mean more threats detected. Click the Export button to download your activity data.',
    color: '#f59e0b',
    bgColor: '#fff3e0',
  },
  {
    icon: <Users size={20} />,
    title: 'Support Contacts',
    description: 'This shows how many support resources you have access to. These are trusted people and organizations ready to help you navigate difficult situations.',
    color: '#af52de',
    bgColor: '#f5e6ff',
  },
];

const faqItems = [
  {
    question: 'What happens when I report something?',
    answer: 'Your report is sent to school administrators who will review it and take appropriate action. The report is confidential and your identity is protected. You will receive updates on the status of your report.',
  },
  {
    question: 'Who can see my journal entries?',
    answer: 'Only you can see your journal entries. They are stored locally on your device and are never sent to any server or shared with anyone, including staff.',
  },
  {
    question: 'What should I do if I see someone else being bullied?',
    answer: 'If you witness cyberbullying, use the "Report a Concern" button to make an anonymous report. You can also encourage the person to seek support through the "Talk to Someone" feature.',
  },
  {
    question: 'Is my data safe on NETHALO?',
    answer: 'Yes. We use industry-standard encryption and security practices. Your personal data is stored securely and is not shared with third parties. For more details, see our Privacy Policy.',
  },
  {
    question: 'How can I improve my Safety Score?',
    answer: 'Your Safety Score reflects your online environment. To improve it: be cautious about who you interact with online, block suspicious accounts, and report concerning behavior. A higher score means a safer environment.',
  },
  {
    question: 'What if I just need to talk but do not want to report?',
    answer: 'Use the "Talk to Someone" feature to connect with counselors, helplines, or support resources. These are confidential and designed to help you process what you are going through.',
  },
];

export const HelpSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // No button render when closed - the help is integrated into the dashboard now
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0,0,0,0.5)',
      }}
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'var(--color300)',
          borderRadius: 20,
          padding: '24px',
          maxWidth: 640,
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          position: 'relative',
          border: '1px solid var(--color-border-light)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HelpCircle size={28} color="#0071e3" />
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                Help &amp; Guide
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                Everything you need to know about NETHALO
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: 'none',
              background: 'var(--color-bg-tertiary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-muted)', minWidth: 36, minHeight: 36,
            }}
            aria-label="Close help"
          >
            <X size={18} />
          </button>
        </div>

        {/* Help Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 24 }}>
          {helpItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                border: '1px solid var(--color-border-light)',
                background: 'var(--color-bg-secondary)',
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: item.bgColor, color: item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 12px 0' }}>
          Frequently Asked Questions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqItems.map((faq, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                border: '1px solid var(--color-border-light)',
                overflow: 'hidden',
                background: 'var(--color-bg-secondary)',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: '100%', padding: '12px 16px', border: 'none', background: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', flex: 1 }}>{faq.question}</span>
                <ChevronDown size={16} color="var(--color-text-muted)" style={{ flexShrink: 0, transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 16px 14px', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div style={{ marginTop: 20, padding: 12, borderRadius: 12, background: 'var(--color-bg-tertiary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Info size={16} color="#0071e3" />
          <span style={{ fontSize: 12.5, color: 'var(--color-text-muted)' }}>
            Need more help? Contact your school counselor or visit the <strong>Talk to Someone</strong> section.
          </span>
        </div>
      </motion.div>
    </div>
  );
};
