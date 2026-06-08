export interface SupportResource {
  id: string;
  title: string;
  description: string;
  href: string;
  phone?: string;
  variant: 'emergency' | 'critical' | 'support';
  icon: string;
}

export const safetyResources: SupportResource[] = [
  {
    id: 'emergency',
    title: 'Emergency Services',
    description: 'Immediate danger \u2014 call 999',
    href: 'tel:999',
    phone: '999',
    variant: 'emergency',
    icon: 'phone',
  },
  {
    id: 'samaritans',
    title: 'Samaritans',
    description: '24/7 listening support. Call 116 123',
    href: 'tel:116123',
    phone: '116 123',
    variant: 'critical',
    icon: 'heart-handshake',
  },
  {
    id: 'childline',
    title: 'Childline',
    description: '1-to-1 chat and support for young people',
    href: 'https://www.childline.org.uk',
    variant: 'support',
    icon: 'message-circle',
  },
  {
    id: 'ceop',
    title: 'CEOP \u2014 Report Abuse',
    description: 'Report online grooming and sexual abuse',
    href: 'https://www.ceop.police.uk/safety-centre/',
    variant: 'support',
    icon: 'shield-alert',
  },
  {
    id: 'shout',
    title: 'Shout Crisis Text Line',
    description: 'Text 85258 for silent crisis support',
    href: 'sms:85258',
    phone: '85258',
    variant: 'critical',
    icon: 'message-square',
  },
  {
    id: 'nspcc',
    title: 'NSPCC Helpline',
    description: 'For adults worried about a child',
    href: 'tel:08088005000',
    phone: '0808 800 5000',
    variant: 'support',
    icon: 'users',
  },
  {
    id: 'papyrus',
    title: 'Papyrus',
    description: 'Prevention of young suicide',
    href: 'tel:08000684141',
    phone: '0800 068 4141',
    variant: 'critical',
    icon: 'sun',
  },
  {
    id: 'report-harmful',
    title: 'Report Harmful Content',
    description: 'Remove harmful content from platforms',
    href: 'https://reportharmfulcontent.com/',
    variant: 'support',
    icon: 'flag',
  },
  {
    id: 'police-101',
    title: 'Police Non-Emergency',
    description: 'Report non-urgent crimes',
    href: 'tel:101',
    phone: '101',
    variant: 'support',
    icon: 'shield',
  },
];