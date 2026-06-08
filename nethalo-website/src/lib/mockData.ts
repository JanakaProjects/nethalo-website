export type UserRole = 'student' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  school?: string;
  age?: number;
}

export interface Threat {
  id: string;
  platform: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  blocked: boolean;
}

export interface ConnectedAccount {
  platform: string;
  label: string;
  connected: boolean;
  username?: string;
  connectedAt?: string;
}

export interface Child {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  threatsDetected: number;
  lastActive: string;
  safeScore: number;
  platform: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  grade: string;
  status: 'safe' | 'warning' | 'critical';
  lastActive: string;
  threatsCount: number;
  safeScore: number;
}

export const socialPlatforms: ConnectedAccount[] = [
  { platform: 'instagram', label: 'Instagram', connected: false },
  { platform: 'tiktok', label: 'TikTok', connected: false },
  { platform: 'snapchat', label: 'Snapchat', connected: false },
  { platform: 'twitter', label: 'X (Twitter)', connected: false },
  { platform: 'whatsapp', label: 'WhatsApp', connected: false },
  { platform: 'discord', label: 'Discord', connected: false },
];

export const mockThreats: Threat[] = [
  { id: 't1', platform: 'Instagram', type: 'Hate Speech', severity: 'high', message: 'Directed insult detected in DM', timestamp: '2 min ago', blocked: true },
  { id: 't2', platform: 'TikTok', type: 'Harassment', severity: 'medium', message: 'Repeated negative comments on video', timestamp: '15 min ago', blocked: true },
  { id: 't3', platform: 'Snapchat', type: 'Cyberbullying', severity: 'critical', message: 'Threatening message received', timestamp: '1 hour ago', blocked: true },
  { id: 't4', platform: 'Discord', type: 'Hate Speech', severity: 'high', message: 'Racial slur in server chat', timestamp: '2 hours ago', blocked: true },
  { id: 't5', platform: 'WhatsApp', type: 'Harassment', severity: 'medium', message: 'Unwanted messages from unknown number', timestamp: '3 hours ago', blocked: true },
  { id: 't6', platform: 'Twitter/X', type: 'Cyberbullying', severity: 'low', message: 'Mild insult in reply thread', timestamp: '5 hours ago', blocked: false },
  { id: 't7', platform: 'Instagram', type: 'Hate Speech', severity: 'high', message: 'Homophobic comment on post', timestamp: '6 hours ago', blocked: true },
  { id: 't8', platform: 'TikTok', type: 'Harassment', severity: 'medium', message: 'Targeted hate in livestream chat', timestamp: '8 hours ago', blocked: true },
  { id: 't9', platform: 'Snapchat', type: 'Cyberbullying', severity: 'critical', message: 'Screenshot of private image shared without consent', timestamp: '12 hours ago', blocked: true },
  { id: 't10', platform: 'Discord', type: 'Hate Speech', severity: 'low', message: 'Offensive username', timestamp: '1 day ago', blocked: false },
  { id: 't11', platform: 'Instagram', type: 'Harassment', severity: 'medium', message: 'Spam hate comments on story', timestamp: '1 day ago', blocked: true },
  { id: 't12', platform: 'WhatsApp', type: 'Cyberbullying', severity: 'high', message: 'Group chat harassment', timestamp: '2 days ago', blocked: true },
  { id: 't13', platform: 'TikTok', type: 'Hate Speech', severity: 'critical', message: 'Death threat in comment', timestamp: '2 days ago', blocked: true },
  { id: 't14', platform: 'Twitter/X', type: 'Harassment', severity: 'medium', message: 'Sustained attack in mentions', timestamp: '3 days ago', blocked: true },
  { id: 't15', platform: 'Snapchat', type: 'Cyberbullying', severity: 'low', message: 'Mean streak from classmate', timestamp: '3 days ago', blocked: false },
  { id: 't16', platform: 'Instagram', type: 'Hate Speech', severity: 'high', message: 'Body shaming comment', timestamp: '4 days ago', blocked: true },
  { id: 't17', platform: 'Discord', type: 'Harassment', severity: 'medium', message: 'Voice chat harassment', timestamp: '5 days ago', blocked: true },
  { id: 't18', platform: 'TikTok', type: 'Cyberbullying', severity: 'high', message: 'Edited video mocking student', timestamp: '6 days ago', blocked: true },
  { id: 't19', platform: 'WhatsApp', type: 'Hate Speech', severity: 'medium', message: 'Racist message in group', timestamp: '1 week ago', blocked: true },
  { id: 't20', platform: 'Twitter/X', type: 'Harassment', severity: 'low', message: 'Mild trolling', timestamp: '1 week ago', blocked: false },
];

export const mockChildren: Child[] = [
  { id: 'c1', name: 'Maya Thompson', avatar: 'M', status: 'online', threatsDetected: 7, lastActive: '2', safeScore: 92, platform: 'Instagram' },
  { id: 'c2', name: 'Jake Thompson', avatar: 'J', status: 'offline', threatsDetected: 12, lastActive: '45', safeScore: 78, platform: 'TikTok' },
  { id: 'c3', name: 'Lily Thompson', avatar: 'L', status: 'away', threatsDetected: 3, lastActive: '15', safeScore: 96, platform: 'Snapchat' },
];

export const mockStudents: StudentRecord[] = [
  { id: 's1', name: 'Aisha Khan', grade: 'Year 12', status: 'safe', lastActive: '5 min ago', threatsCount: 2, safeScore: 95 },
  { id: 's2', name: 'Ben Carter', grade: 'Year 10', status: 'warning', lastActive: '20 min ago', threatsCount: 8, safeScore: 72 },
  { id: 's3', name: 'Chloe Davis', grade: 'Year 11', status: 'safe', lastActive: '1 hour ago', threatsCount: 1, safeScore: 98 },
  { id: 's4', name: 'Daniel Park', grade: 'Year 9', status: 'critical', lastActive: '3 hours ago', threatsCount: 15, safeScore: 55 },
  { id: 's5', name: 'Ella Martinez', grade: 'Year 12', status: 'safe', lastActive: '10 min ago', threatsCount: 0, safeScore: 100 },
  { id: 's6', name: 'Finn O\'Brien', grade: 'Year 10', status: 'warning', lastActive: '30 min ago', threatsCount: 5, safeScore: 80 },
  { id: 's7', name: 'Grace Wilson', grade: 'Year 11', status: 'safe', lastActive: '2 hours ago', threatsCount: 3, safeScore: 90 },
  { id: 's8', name: 'Harry Zhang', grade: 'Year 9', status: 'warning', lastActive: '1 hour ago', threatsCount: 6, safeScore: 75 },
  { id: 's9', name: 'Isabella Rossi', grade: 'Year 12', status: 'safe', lastActive: '15 min ago', threatsCount: 1, safeScore: 97 },
  { id: 's10', name: 'Jack Thompson', grade: 'Year 10', status: 'critical', lastActive: '4 hours ago', threatsCount: 22, safeScore: 45 },
];

export const weeklyMoodData = [
  { day: 'Mon', threats: 12, safeScore: 85 },
  { day: 'Tue', threats: 8, safeScore: 88 },
  { day: 'Wed', threats: 15, safeScore: 78 },
  { day: 'Thu', threats: 5, safeScore: 92 },
  { day: 'Fri', threats: 10, safeScore: 86 },
  { day: 'Sat', threats: 3, safeScore: 95 },
  { day: 'Sun', threats: 7, safeScore: 90 },
];

export const mockEvents = [
  { id: 'e1', type: 'threat_blocked', platform: 'Instagram', message: 'Hate speech blocked in DM', time: '2 min ago' },
  { id: 'e2', type: 'threat_blocked', platform: 'TikTok', message: 'Harassing comment removed', time: '15 min ago' },
  { id: 'e3', type: 'safe_alert', platform: 'Snapchat', message: 'New account connected', time: '30 min ago' },
  { id: 'e4', type: 'threat_blocked', platform: 'Discord', message: 'Toxic message filtered', time: '1 hour ago' },
  { id: 'e5', type: 'weekly_report', platform: '', message: 'Weekly safety report ready', time: '2 hours ago' },
  { id: 'e6', type: 'safe_alert', platform: 'Instagram', message: 'Kindness reward earned', time: '3 hours ago' },
  { id: 'e7', type: 'threat_blocked', platform: 'WhatsApp', message: 'Spam sender blocked', time: '5 hours ago' },
  { id: 'e8', type: 'connection', platform: 'TikTok', message: 'TikTok account connected', time: '1 day ago' },
];
