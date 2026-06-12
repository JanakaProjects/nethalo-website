export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Audience {
  id: string;
  label: string;
  icon: string;
  benefits: Benefit[];
  testimonial: Testimonial;
}

export const audiences: Audience[] = [
  {
    id: 'students',
    label: 'Students (16\u201319)',
    icon: 'user',
    benefits: [
      { title: 'Invisible Shield', description: 'Filters toxicity without lag or censorship across all your apps.', icon: 'shield' },
      { title: 'Kindness Rewards', description: 'Earn XP for positivity. Unlock Ma-Mo skins and profile upgrades.', icon: 'award' },
      { title: 'Silent SOS', description: 'Discrete emergency alert that sends your location to trusted contacts.', icon: 'siren' },
      { title: 'Message Refiner', description: 'AI suggests kinder wording before you hit send.', icon: 'pen-tool' },
    ],
    testimonial: {
      quote: 'I finally feel safe posting my art without fear of hate comments. Ma-Mo has my back.',
      author: 'Alex Chen',
      role: 'Student, Year 12',
    },
  },
  {
    id: 'parents',
    label: 'Parents',
    icon: 'eye',
    benefits: [
      { title: 'Trust Not Surveillance', description: 'See safety scores and trends without reading private messages.', icon: 'shield-check' },
      { title: 'Instant Alerts', description: 'Get notified only when real danger is detected \u2014 not for every argument.', icon: 'bell-ring' },
      { title: 'Digital Curfew', description: 'Set healthy boundaries that respect homework and sleep.', icon: 'clock' },
      { title: 'Family Guidance AI', description: 'Generated conversation starters based on your child\u2019s digital wellbeing.', icon: 'message-circle' },
    ],
    testimonial: {
      quote: 'I was worried about being overbearing. National Hate Crime gives me peace of mind without invading her privacy.',
      author: 'Sarah Mitchell',
      role: 'Parent of 17-year-old',
    },
  },
  {
    id: 'schools',
    label: 'Schools & Colleges',
    icon: 'graduation-cap',
    benefits: [
      { title: 'Institutional Dashboard', description: 'Identify at-risk students proactively without invading privacy.', icon: 'layout-dashboard' },
      { title: 'Dual-Mode Protection', description: 'School Wi-Fi alerts go to counsellors. Home alerts go to parents. Seamless handoff.', icon: 'git-branch' },
      { title: 'Compliance Ready', description: 'Meets KCSIE, CIPA, and UK Online Safety Bill standards out of the box.', icon: 'file-check' },
      { title: 'Digital Curriculum', description: '50+ hours of lesson plans on digital citizenship and anti-bullying.', icon: 'book-open' },
    ],
    testimonial: {
      quote: 'National Hate Crime has transformed how we approach digital safeguarding. The dual-mode system is exactly what we needed.',
      author: 'Dr. James Okonkwo',
      role: 'Head of Pastoral Care',
    },
  },
];
