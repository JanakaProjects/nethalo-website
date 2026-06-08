export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FAQItem[] = [
  {
    id: 'private-messages',
    question: 'Does NETHALO read my private messages?',
    answer:
      'No. NETHALO uses on-device processing for the majority of its analysis. Your personal conversations stay on your phone. We only receive anonymised flags for severe safety threats that require human intervention.',
    category: 'privacy',
  },
  {
    id: 'parent-access',
    question: 'Can parents see exactly what I type?',
    answer:
      'By default, no. Parents see a Safety Score and high-level insights like stress trends. They cannot read your messages unless a verified severe threat to life is detected.',
    category: 'privacy',
  },
  {
    id: 'supported-apps',
    question: 'Which apps are supported?',
    answer:
      'NETHALO currently supports Instagram, TikTok, and Discord on iOS and Android. We are actively working on Snapchat and WhatsApp integration for a future release.',
    category: 'technical',
  },
  {
    id: 'free',
    question: 'Is NETHALO free for students?',
    answer:
      'Yes. The core Student Guard features are completely free for anyone with a valid student email address. Advanced Parental Insight features require a subscription.',
    category: 'pricing',
  },
  {
    id: 'ai-accuracy',
    question: 'How accurate is the AI detection?',
    answer:
      'Our deep learning model achieves 99.8% detection accuracy with under 50ms latency. We continuously train on anonymised data to reduce false positives and understand evolving online language.',
    category: 'technical',
  },
  {
    id: 'data-privacy',
    question: 'What data do you store about me?',
    answer:
      'We store only what is essential: your account details, safety score history, and anonymised threat patterns. We never sell your data. Full GDPR compliance is maintained.',
    category: 'privacy',
  },
  {
    id: 'school-integration',
    question: 'Can my school use NETHALO?',
    answer:
      'Yes. We offer institutional plans with a dedicated dashboard for safeguarding teams. The dual-mode system ensures school counsellors see relevant data during school hours, while parents take over at home.',
    category: 'technical',
  },
  {
    id: 'mamo',
    question: 'Who is Ma-Mo?',
    answer:
      'Ma-Mo is your AI guardian dragon \u2014 a friendly companion designed to listen, advise, and protect. They appear in the app as a chat companion, offering emotional support, conflict resolution advice, and daily encouragement.',
    category: 'general',
  },
];