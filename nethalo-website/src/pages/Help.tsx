import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, AlertTriangle, MessageCircle, FileText, BookOpen, Activity, Users, TrendingUp, Search, Info, type LucideIcon } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout/DashboardLayout';
import { useIsMobile } from '../lib/useIsMobile';

interface HelpItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const helpTopics: HelpItem[] = [
  {
    icon: Shield,
    title: 'Dashboard Overview',
    description: 'Your Safety Score reflects how safe your online environment is based on recent activity. Higher scores mean fewer threats detected. The weekly activity chart and recent activity feed keep you informed about flagged interactions.',
    color: 'var(--color-brand-shield)',
    bgColor: '#e0f2fe',
  },
  {
    icon: AlertTriangle,
    title: 'Report a Concern',
    description: 'If you experience or witness cyberbullying, harassment, or any concerning behavior, click this button to submit a confidential report. School administrators will review it promptly. Your identity is always protected.',
    color: '#f59e0b',
    bgColor: '#fff3e0',
  },
  {
    icon: MessageCircle,
    title: 'Talk to Someone',
    description: 'Feeling overwhelmed? Connect with a school counselor, crisis helpline, or use the anonymous tip line. Help is available 24/7. Speaking up is always a sign of strength.',
    color: 'var(--color-brand-shield)',
    bgColor: '#e0f2fe',
  },
  {
    icon: FileText,
    title: 'View Your Reports',
    description: 'Track the status of any reports you have submitted. You can see whether they are pending, in review, or resolved. You can also export your data for your records at any time.',
    color: '#34d399',
    bgColor: '#e8f8e8',
  },
  {
    icon: BookOpen,
    title: 'Private Journal',
    description: 'Your private journal is a safe space to write down your thoughts and feelings. Entries are stored securely and are not accessible by anyone else, including school staff. Only you can see your journal.',
    color: '#af52de',
    bgColor: '#f5e6ff',
  },
  {
    icon: Activity,
    title: 'Safety Score Explained',
    description: 'Your Safety Score (0-100) estimates how safe your online environment is. A higher score means fewer threats detected. Scores below 60 indicate concerning activity that may need attention from a trusted adult.',
    color: 'var(--color-brand-shield)',
    bgColor: '#e0f2fe',
  },
  {
    icon: TrendingUp,
    title: 'Weekly Activity Chart',
    description: 'The weekly activity chart shows how many potentially harmful interactions were flagged each day. Higher bars mean more threats detected. Use the Export button to download your activity data.',
    color: '#f59e0b',
    bgColor: '#fff3e0',
  },
  {
    icon: Users,
    title: 'Support Contacts',
    description: 'This shows how many support resources you have access to. These are trusted people and organizations ready to help you navigate difficult situations. Do not hesitate to reach out if you need support.',
    color: '#af52de',
    bgColor: '#f5e6ff',
  },
];

const faqs: FaqItem[] = [
  {
    question: 'What happens when I report something?',
    answer: 'Your report is sent to school administrators who will review it and take appropriate action. The report is confidential and your identity is protected. You will receive updates on the status of your report.',
  },
  {
    question: 'Who can see my journal entries?',
    answer: 'No one else can see your journal entries. They are stored locally on your device and are never sent to any server or shared with anyone, including school staff.',
  },
  {
    question: 'What should I do if I see someone else being bullied?',
    answer: 'If you witness cyberbullying, use the "Report a Concern" button to make an anonymous report. You can also encourage the person to seek support through the "Talk to Someone" feature.',
  },
  {
    question: 'Is my data safe on National Hate Crime?',
    answer: 'Yes. We use industry-standard encryption and security practices. Your personal data is stored securely and is not shared with third parties.',
  },
  {
    question: 'How can I improve my Safety Score?',
    answer: 'Your Safety Score reflects your online environment. To improve it: be cautious about who you interact with online, block suspicious accounts, and report concerning behavior.',
  },
  {
    question: 'What if I just need to talk but do not want to report?',
    answer: 'Use the "Talk to Someone" feature to connect with counselors, helplines, or support resources. These are confidential and designed to help you process what you are going through.',
  },
  {
    question: 'Can I delete my account or data?',
    answer: 'Yes. You can delete your account and all associated data from the Settings page. This action is permanent and cannot be undone.',
  },
];

export const Help: React.FC = () => {
  const isMobile = useIsMobile(768);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredTopics = searchQuery
    ? helpTopics.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : helpTopics;

  return (
    <DashboardLayout>
      <style>{`
        .help-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
        @media (max-width: 768px) { .help-grid { grid-template-columns: 1fr; } }
        .faq-arrow { transition: transform 0.2s ease; }
        .faq-arrow.open { transform: rotate(180deg); }
      `}</style>
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
          Help &amp; Guide
        </h1>
        <p style={{ fontSize: isMobile ? 14 : 16, color: 'var(--color-text-secondary)', marginTop: 6 }}>
          Everything you need to know about National Hate Crime
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: isMobile ? 20 : 24 }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, border: '1px solid var(--color-border-light)',
              fontSize: 15, color: 'var(--color-text-primary)', background: 'var(--color-bg-elevated)', outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: 48, transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-brand-shield)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
          />
        </div>
      </div>

      {/* Help Topics Grid */}
      <div className="help-grid" style={{ marginBottom: isMobile ? 24 : 32 }}>
        {filteredTopics.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              style={{
                padding: isMobile ? '20px' : '24px',
                borderRadius: 16,
                border: '1px solid var(--color-border-light)',
                background: 'var(--color-bg-elevated)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--color-border-light)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: item.bgColor, color: item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={20} />
                </div>
                <span style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: isMobile ? 13 : 14, color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0 }}>{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 16px 0' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderRadius: 12, border: '1px solid var(--color-border-light)', overflow: 'hidden', background: 'var(--color-bg-elevated)' }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: '100%', padding: isMobile ? '14px 16px' : '16px 20px', border: 'none', background: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--color-text-primary)', flex: 1, paddingRight: 12 }}>{faq.question}</span>
                <ChevronDown
                  size={18}
                  color="var(--color-text-secondary)"
                  style={{
                    flexShrink: 0,
                    transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
              <AnimatePresence initial={false}>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: isMobile ? '0 16px 14px' : '0 20px 16px', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Contact hint */}
      <div style={{
        padding: isMobile ? '16px' : '20px 24px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f7ff 100%)',
        border: '1px solid #e0f2fe',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: 12,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <Info size={24} color="var(--color-brand-shield)" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
            Need more help?
          </div>
          <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            Contact your school counselor, use the <strong>Talk to Someone</strong> feature, or reach out through your school&apos;s support channels.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

