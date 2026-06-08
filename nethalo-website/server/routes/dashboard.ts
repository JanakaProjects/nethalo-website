import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const uid = req.user.userId;

  const threatCount = (db.prepare('SELECT COUNT(*) as c FROM threats WHERE user_id = ?').get(uid) as any).c;
  const blockedCount = (db.prepare('SELECT COUNT(*) as c FROM threats WHERE user_id = ? AND blocked=1').get(uid) as any).c;
  const reportCount = (db.prepare('SELECT COUNT(*) as c FROM reports WHERE user_id = ?').get(uid) as any).c;
  const childCount = (db.prepare('SELECT COUNT(*) as c FROM children WHERE parent_id = ?').get(uid) as any).c;
  const journalCount = (db.prepare('SELECT COUNT(*) as c FROM journal_entries WHERE user_id = ?').get(uid) as any).c;

  // Weekly threat trend (last 7 days)
  const weeklyTrend = db.prepare(`
    SELECT DATE(timestamp) as day, COUNT(*) as threats
    FROM threats WHERE user_id = ? AND timestamp >= DATE('now', '-7 days')
    GROUP BY DATE(timestamp) ORDER BY day
  `).all(uid);

  // Recent events
  const recentThreats = db.prepare(
    'SELECT id, platform, type, severity, message, timestamp FROM threats WHERE user_id = ? ORDER BY timestamp DESC LIMIT 10'
  ).all(uid);

  res.json({
    stats: {
      totalThreats: threatCount,
      threatsBlocked: blockedCount,
      activeReports: reportCount,
      connectedChildren: childCount,
      journalEntries: journalCount,
      safeScore: blockedCount > 0 ? Math.round((1 - threatCount / (threatCount + 20)) * 100) : 95,
    },
    weeklyTrend,
    recentActivity: recentThreats.map((t: any) => ({
      id: t.id,
      type: 'threat',
      platform: t.platform,
      message: `${t.type} ${t.severity === 'critical' ? '(critical)' : ''}`,
      severity: t.severity,
      time: t.timestamp,
    })),
  });
});

export default router;
