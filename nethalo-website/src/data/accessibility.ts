export interface AccessibilityFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TrustPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const accessibilityData = {
  headline: 'Built for Everyone. Protected by Design.',
  subhead: 'Accessibility and trust are not afterthoughts \u2014 they are foundational to how NETHALO works.',
  features: [
    {
      id: 'tts',
      title: 'Text-to-Speech',
      description: 'Every piece of content can be read aloud using natural voice synthesis. Choose from multiple voices and speeds.',
      icon: 'volume-2',
    },
    {
      id: 'clear-fonts',
      title: 'Clear Typography',
      description: 'We use highly legible fonts with optional larger text sizes. No decorative fonts that sacrifice readability.',
      icon: 'type',
    },
    {
      id: 'simple-colors',
      title: 'Thoughtful Colours',
      description: 'Our palette is designed for WCAG AA/AAA contrast. High contrast mode is available for users with visual impairments.',
      icon: 'contrast',
    },
    {
      id: 'zoom-support',
      title: 'Zoom Friendly',
      description: 'The entire interface supports up to 200% zoom without breaking layout or hiding content.',
      icon: 'search-plus',
    },
    {
      id: 'keyboard-nav',
      title: 'Keyboard Navigation',
      description: 'Every interactive element is reachable and operable by keyboard alone. Visual focus indicators are always visible.',
      icon: 'keyboard',
    },
    {
      id: 'reduced-motion',
      title: 'Reduced Motion',
      description: 'All animations respect the prefers-reduced-motion system setting. Users control their experience.',
      icon: 'eye-off',
    },
  ],
  trustPrinciples: [
    {
      id: 'data-minimisation',
      title: 'Data Minimisation',
      description: 'We collect only what is absolutely necessary. Your messages stay on your device \u2014 not our servers.',
      icon: 'lock',
    },
    {
      id: 'on-device-ai',
      title: 'On-Device AI',
      description: 'The majority of AI processing happens locally. Your private conversations never leave your phone.',
      icon: 'cpu',
    },
    {
      id: 'end-to-end-encryption',
      title: 'Encryption First',
      description: 'All data in transit and at rest is encrypted using industry-standard protocols.',
      icon: 'shield-check',
    },
    {
      id: 'transparency',
      title: 'Complete Transparency',
      description: 'We publish our data handling practices, moderation guidelines, and AI ethics framework openly.',
      icon: 'eye',
    },
  ],
};