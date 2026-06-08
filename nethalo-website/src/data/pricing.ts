export const pricingPlans = [
  {
    name: 'Student',
    price: 'Free',
    description: 'Essential protection for young people.',
    features: ['AI-powered threat detection', 'Real-time content filtering', 'Weekly safety insights', 'On-device processing'],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Parent',
    price: '\u00A34.99',
    period: '/month',
    description: 'Protect your child across every platform.',
    features: ['Everything in Student', 'Parental dashboard', 'Gentle alert system', 'Activity summaries', 'Multi-child support'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'School',
    price: 'Custom',
    period: '',
    description: 'Enterprise-grade protection for your school.',
    features: ['Everything in Parent', 'Admin console', 'Bulk enrollment', 'Staff training', 'Dedicated support'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];
