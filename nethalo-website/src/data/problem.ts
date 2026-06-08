export const problem = {
  headline: 'The Crisis Young People Face',
  subhead:
    "Cyberbullying isn't just online drama \u2014 it's a wellbeing emergency affecting millions of young people across the UK.",
  narrativeBlocks: [
    {
      type: 'stat' as const,
      stat: { value: '37%', label: 'of UK teens 16\u201319 experience cyberbullying' },
      icon: 'shield-alert',
    },
    {
      type: 'evidence' as const,
      title: 'Educational Impact',
      description: 'Victims are 2.3x more likely to skip school or disengage from learning due to fear of harassment.',
      icon: 'graduation-cap',
    },
    {
      type: 'evidence' as const,
      title: 'Mental Health Toll',
      description: '42% report increased anxiety, 31% experience depression linked to persistent online harassment.',
      icon: 'heart-crack',
    },
    {
      type: 'stat' as const,
      stat: { value: '7.9%', label: 'of college students report being cyberbullied' },
      icon: 'users',
    },
    {
      type: 'evidence' as const,
      title: 'The Silence Problem',
      description: '71% of young people do not report cyberbullying \u2014 fearing it will make things worse or get them offline.',
      icon: 'message-circle-off',
    },
  ],
  keyStats: [
    { value: '37%', label: 'Teens Affected', trend: 'up' as const, trendLabel: 'Rising year on year' },
    { value: '2.3x', label: 'School Absence Risk', trend: 'neutral' as const },
    { value: '42%', label: 'Report Anxiety', trend: 'up' as const, trendLabel: 'Linked to online harm' },
    { value: '71%', label: 'Dont Report It', trend: 'down' as const, trendLabel: 'Silent majority' },
  ],
};