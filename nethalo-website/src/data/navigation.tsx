import { Shield, Eye, Users, BookOpen, Heart, MessageCircle, AlertTriangle } from 'lucide-react';

export const navigation = {
  navItems: [
    {
      label: 'Features',
      dropdown: [
        { label: 'Threat Detection', desc: 'AI-powered cyberbullying detection in real-time', href: '#features', icon: <Shield size={16} /> },
        { label: 'Parent Dashboard', desc: 'Monitor your child\'s online safety at a glance', href: '#features', icon: <Eye size={16} /> },
        { label: 'Support Network', desc: 'Connect with counselors and trusted contacts', href: '#features', icon: <Users size={16} /> },
        { label: 'Anonymous Reporting', desc: 'Report concerns safely and confidentially', href: '#features', icon: <AlertTriangle size={16} /> },
      ],
    },
    {
      label: 'How It Works',
      href: '#how-it-works',
    },
    {
      label: 'Resources',
      dropdown: [
        { label: 'Help Center', desc: 'Guides and answers to common questions', href: '/help', icon: <BookOpen size={16} /> },
        { label: 'Safety Guide', desc: 'Tips for staying safe online', href: '/help', icon: <Heart size={16} /> },
        { label: 'Talk to Someone', desc: '24/7 confidential support', href: '/connect', icon: <MessageCircle size={16} /> },
      ],
    },
    {
      label: 'Pricing',
      href: '#pricing',
    },
  ],
  footerLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Contact', href: '#cta' },
  ],
  legalText: '2026 National Hate Crime. All rights reserved.',
};

