export interface Feature {
  id: string;
  category: 'filtering' | 'parental' | 'social' | 'wellbeing' | 'accessibility';
  icon: string;
  title: string;
  description: string;
  details: string[];
}

export const solution = {
  headline: 'How National Hate Crime Works',
  subhead: 'A layered defense system \u2014 not a single feature. Protection at every level of your digital life.',
  categories: [
    { id: 'filtering' as const, label: 'Smart Filtering', icon: 'shield-alert', color: 'blue' },
    { id: 'parental' as const, label: 'Parental Insight', icon: 'eye', color: 'green' },
    { id: 'social' as const, label: 'Safer Social', icon: 'message-circle', color: 'pink' },
    { id: 'wellbeing' as const, label: 'Digital Wellbeing', icon: 'heart', color: 'yellow' },
    { id: 'accessibility' as const, label: 'Accessible by Default', icon: 'accessibility', color: 'purple' },
  ],
  features: [
    {
      id: 'harmful-filter',
      category: 'filtering' as const,
      icon: 'scan-text',
      title: 'Harmful Comment Warning',
      description: 'AI detects abusive language in real-time and warns before you post or receive harmful messages.',
      details: [
        'Context-aware detection beyond keyword matching',
        'Explains why specific content was flagged',
        'Option to review and confirm before sending anyway',
      ],
    },
    {
      id: 'vision-shield',
      category: 'filtering' as const,
      icon: 'scan-eye',
      title: 'Vision Shield',
      description: 'Automatically detects and blurs doxxing attempts, sensitive information, and harmful imagery.',
      details: [
        'Multimodal analysis of images and text',
        'Real-time PII redaction',
        'Zero-latency processing under 50ms',
      ],
    },
    {
      id: 'parent-modes',
      category: 'parental' as const,
      icon: 'sliders',
      title: 'Adaptive Parental Modes',
      description: 'Switch between Tolerable (trust-based) and Severe (strict) protection modes.',
      details: [
        'Tolerable mode monitors without reading content',
        'Severe mode provides deeper safety controls',
        'Weekly emotional climate reports',
      ],
    },
    {
      id: 'digital-curfew',
      category: 'parental' as const,
      icon: 'clock',
      title: 'Digital Curfew',
      description: 'Set healthy screen time boundaries that block social apps while keeping educational tools available.',
      details: [
        'Customisable schedules per day',
        'Educational tools remain accessible',
        'Gentle wind-down notifications',
      ],
    },
    {
      id: 'kindness-engine',
      category: 'social' as const,
      icon: 'award',
      title: 'Kindness Engine',
      description: 'Gamified positivity that rewards constructive interactions with XP, badges, and exclusive Ma-Mo skins.',
      details: [
        'XP earned for kind messages and support',
        'Streak tracking for daily positivity',
        'Unlockable rewards and profile upgrades',
      ],
    },
    {
      id: 'message-refiner',
      category: 'social' as const,
      icon: 'pen-tool',
      title: 'Message Refiner',
      description: 'AI suggests kinder, clearer wording before you send \u2014 helping prevent misunderstandings.',
      details: [
        'Real-time tone analysis as you type',
        'Alternative phrasing suggestions',
        'Explains why your message might be misinterpreted',
      ],
    },
    {
      id: 'zen-guide',
      category: 'wellbeing' as const,
      icon: 'wind',
      title: 'Zen Guide',
      description: 'Guided breathing exercises and grounding scripts triggered when stress patterns are detected.',
      details: [
        'Pattern Interrupt for rapid scrolling',
        'Visual breathing animations',
        'AI-generated personalised grounding scripts',
      ],
    },
    {
      id: 'silent-sos',
      category: 'wellbeing' as const,
      icon: 'siren',
      title: 'Silent SOS',
      description: 'Discrete emergency alert that instantly notifies trusted guardians with your location and context.',
      details: [
        'One-tap silent activation',
        'Sends location and context snapshot',
        'Notifies designated emergency contacts',
      ],
    },
    {
      id: 'text-to-speech',
      category: 'accessibility' as const,
      icon: 'volume-2',
      title: 'Text-to-Speech',
      description: 'All content can be read aloud with natural voice synthesis for neurodiverse users.',
      details: [
        'Multiple voice options',
        'Adjustable reading speed',
        'Works across all portal views',
      ],
    },
    {
      id: 'high-contrast',
      category: 'accessibility' as const,
      icon: 'contrast',
      title: 'High Contrast Mode',
      description: 'Enhanced visual clarity with WCAG AAA contrast ratios for users with visual impairments.',
      details: [
        'Meets WCAG AAA standards',
        'Works in both light and dark themes',
        'Does not affect decorative elements',
      ],
    },
  ],
};
