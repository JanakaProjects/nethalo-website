import { getDb } from '../db.js';
import { sendWeeklyDigest } from './email.js';

export function startWeeklyDigest() {
  // Run every Monday at 9:00 AM
  const now = new Date();
  const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (1 + 7 - now.getDay()) % 7, 9, 0, 0);
  const msUntilNext = nextMonday.getTime() - now.getTime();

  setTimeout(() => {
    runDigest();
    // Then repeat every 7 days
    setInterval(runDigest, 7 * 24 * 60 * 60 * 1000);
  }, msUntilNext);
}

function runDigest() {
  const db = getDb();
  const users = db.prepare('SELECT id, name, email FROM users WHERE role IN (?, ?)').all('student', 'parent');

  for (const user of users) {
    const stats = db.prepare(`
      SELECT COUNT(*) as totalThreats, 
             SUM(CASE WHEN blocked=1 THEN 1 ELSE 0 END) as blocked 
      FROM threats WHERE user_id = ? AND timestamp >= DATE('now', '-7 days')
    `).get(user.id) as any;

    if (stats && stats.totalThreats > 0) {
      sendWeeklyDigest(user.email, user.name, stats).catch(() => {});
    }
  }
}