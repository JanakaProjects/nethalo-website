import { initDb, getDb } from './db.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function id(prefix: string): string {
  return `${prefix}${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

export function seed() {
  // Initialize tables first
  initDb();
  const db = getDb();

  // Check if already seeded
  const existingUsers = db.prepare('SELECT COUNT(*) as c FROM users').get() as any;
  if (existingUsers.c > 0) {
    console.log('Database already seeded');
    return;
  }

  const pw = bcrypt.hashSync('password123', 10);

  // Seed users matching mock auth
  const users = [
    { id: 'u1', name: 'Alex Rivera', email: 'student@nethalo.com', password: pw, role: 'student', school: 'Manchester Academy', age: 16 },
    { id: 'u2', name: 'Sarah Thompson', email: 'parent@nethalo.com', password: pw, role: 'parent' },
    { id: 'u3', name: 'Dr. James Mitchell', email: 'admin@nethalo.com', password: pw, role: 'admin', school: 'Brighton College', admin_role: 'head' },
    { id: 'u4', name: 'Demo Student', email: 'demo@nethalo.com', password: pw, role: 'student', school: 'Central High', age: 15 },
    { id: 'u5', name: 'Demo Parent', email: 'demo-parent@nethalo.com', password: pw, role: 'parent' },
  ];

  const insertUser = db.prepare(
    'INSERT OR IGNORE INTO users (id, name, email, password, role, school, age, admin_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  );
  for (const u of users) {
    insertUser.run(u.id, u.name, u.email, u.password, u.role, u.school || null, u.age || null, (u as any).admin_role || null);
  }
  console.log(`Seeded ${users.length} users`);

  // Children for parent u2
  const children = [
    { id: 'c1', name: 'Maya Thompson', grade: 'Year 8', platform: 'Instagram', status: 'online', safe_score: 92 },
    { id: 'c2', name: 'Jake Thompson', grade: 'Year 6', platform: 'TikTok', status: 'offline', safe_score: 78 },
    { id: 'c3', name: 'Lily Thompson', grade: 'Year 4', platform: 'Snapchat', status: 'away', safe_score: 96 },
  ];
  const insertChild = db.prepare(
    'INSERT OR IGNORE INTO children (id, parent_id, name, grade, platform, status, safe_score) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  for (const c of children) {
    insertChild.run(c.id, 'u2', c.name, c.grade, c.platform, c.status, c.safe_score);
  }
  console.log(`Seeded ${children.length} children`);

  // Threats for student u1
  const threats = [
    { platform: 'Instagram', type: 'Hate Speech', severity: 'high', message: 'Directed insult detected in DM' },
    { platform: 'TikTok', type: 'Harassment', severity: 'medium', message: 'Repeated negative comments on video' },
    { platform: 'Snapchat', type: 'Cyberbullying', severity: 'critical', message: 'Threatening message received' },
    { platform: 'Discord', type: 'Hate Speech', severity: 'high', message: 'Racial slur in server chat' },
    { platform: 'WhatsApp', type: 'Harassment', severity: 'medium', message: 'Unwanted messages from unknown number' },
    { platform: 'Twitter/X', type: 'Cyberbullying', severity: 'low', message: 'Mild insult in reply thread', blocked: 0 },
    { platform: 'Instagram', type: 'Hate Speech', severity: 'high', message: 'Homophobic comment on post' },
    { platform: 'TikTok', type: 'Harassment', severity: 'medium', message: 'Targeted hate in livestream chat' },
    { platform: 'Snapchat', type: 'Cyberbullying', severity: 'critical', message: 'Private image shared without consent' },
    { platform: 'Discord', type: 'Hate Speech', severity: 'low', message: 'Offensive username', blocked: 0 },
  ];
  const insertThreat = db.prepare(
    'INSERT INTO threats (user_id, platform, type, severity, message, blocked) VALUES (?, ?, ?, ?, ?, ?)'
  );
  for (const t of threats) {
    insertThreat.run('u1', t.platform, t.type, t.severity, t.message, (t as any).blocked ?? 1);
  }
  // Also a few threats for demo student
  for (const t of threats.slice(0, 5)) {
    insertThreat.run('u4', t.platform, t.type, t.severity, t.message, 1);
  }
  console.log('Seeded threats');

  // Reports
  const insertReport = db.prepare(
    'INSERT INTO reports (user_id, type, description, target_name) VALUES (?, ?, ?, ?)'
  );
  insertReport.run('u1', 'harassment', 'User receiving hateful DMs', 'unknown_user_1');
  insertReport.run('u1', 'impersonation', 'Fake account pretending to be me', 'fake_account_123');
  insertReport.run('u3', 'other', 'Flagged content on school network', 'student_post');
  console.log('Seeded reports');

  // Journal entries
  const insertJournal = db.prepare(
    'INSERT INTO journal_entries (user_id, content, mood) VALUES (?, ?, ?)'
  );
  insertJournal.run('u1', 'Had a rough day at school. Someone posted mean things about me online but I reported it.', 'worried');
  insertJournal.run('u1', 'Feeling better today. Talked to my parents about what happened.', 'calm');
  insertJournal.run('u1', 'Joined a new club at school. Making friends who are kind.', 'happy');
  insertJournal.run('u4', 'First day using the app. It feels good knowing my messages are monitored.', 'curious');
  console.log('Seeded journal entries');

  // Connected accounts for u1
  const insertAccount = db.prepare(
    'INSERT OR IGNORE INTO connected_accounts (user_id, platform, label, connected, username) VALUES (?, ?, ?, ?, ?)'
  );
  const platforms = [
    { platform: 'instagram', label: 'Instagram', username: 'alex.rivera' },
    { platform: 'tiktok', label: 'TikTok', username: 'alexr_official' },
    { platform: 'snapchat', label: 'Snapchat', username: 'alex_r' },
  ];
  for (const p of platforms) {
    insertAccount.run('u1', p.platform, p.label, 1, p.username);
  }
  // Unconnected platforms
  insertAccount.run('u1', 'twitter', 'X (Twitter)', 0, null);
  insertAccount.run('u1', 'whatsapp', 'WhatsApp', 0, null);
  insertAccount.run('u1', 'discord', 'Discord', 0, null);
  console.log('Seeded connected accounts');

  console.log('Database seeding complete!');
}

// Run directly
seed();
