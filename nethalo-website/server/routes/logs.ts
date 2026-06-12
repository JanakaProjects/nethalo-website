import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

function initLogsTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      action TEXT NOT NULL,
      details TEXT,
      ip_address TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initLogsTable();

export function logActivity(userId: string | null, action: string, details?: string, ipAddress?: string) {
  const db = getDb();
  db.prepare('INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)').run(userId, action, details || null, ipAddress || null);
}

// GET /api/logs - Get activity logs (admin only)
router.get('/', (req: Request, res: Response) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }

  const db = getDb();
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const total = (db.prepare('SELECT COUNT(*) as c FROM activity_logs').get() as any).c;
  const logs = db.prepare(`
    SELECT al.*, u.name as user_name, u.email as user_email 
    FROM activity_logs al 
    LEFT JOIN users u ON al.user_id = u.id 
    ORDER BY al.created_at DESC 
    LIMIT ? OFFSET ?
  `).all(limit, offset);

  res.json({ logs, total, page, limit, totalPages: Math.ceil(total / limit) });
});

// GET /api/logs/recent - Get recent activity (all users)
router.get('/recent', (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const db = getDb();
  const limit = parseInt(req.query.limit as string) || 10;
  const logs = db.prepare(`
    SELECT al.*, u.name as user_name 
    FROM activity_logs al 
    LEFT JOIN users u ON al.user_id = u.id 
    WHERE al.user_id = ?
    ORDER BY al.created_at DESC 
    LIMIT ?
  `).all(req.user.userId, limit);

  res.json({ logs });
});

export default router;
