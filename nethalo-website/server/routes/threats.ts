import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

// GET /api/threats
router.get('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const { limit, offset, severity } = req.query;
  let sql = 'SELECT * FROM threats WHERE user_id = ?';
  const params: any[] = [req.user.userId];

  if (severity) {
    sql += ' AND severity = ?';
    params.push(severity);
  }
  sql += ' ORDER BY timestamp DESC';
  if (limit) sql += ' LIMIT ?';
  if (limit) params.push(Number(limit));
  if (offset) { sql += ' OFFSET ?'; params.push(Number(offset)); }

  const threats = db.prepare(sql).all(...params);
  const total = (db.prepare('SELECT COUNT(*) as count FROM threats WHERE user_id = ?').get(req.user.userId) as any).count;
  res.json({ threats, total });
});

// GET /api/threats/stats
router.get('/stats', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const stats = db.prepare(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN severity='critical' THEN 1 ELSE 0 END) as critical,
      SUM(CASE WHEN severity='high' THEN 1 ELSE 0 END) as high,
      SUM(CASE WHEN severity='medium' THEN 1 ELSE 0 END) as medium,
      SUM(CASE WHEN severity='low' THEN 1 ELSE 0 END) as low,
      SUM(CASE WHEN blocked=1 THEN 1 ELSE 0 END) as blocked
    FROM threats WHERE user_id = ?
  `).get(req.user.userId);
  res.json({ stats });
});

// POST /api/threats
router.post('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { platform, type, severity, message } = req.body;
  if (!platform || !type || !severity || !message) {
    res.status(400).json({ error: 'platform, type, severity, message required' }); return;
  }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO threats (user_id, platform, type, severity, message) VALUES (?, ?, ?, ?, ?)'
  ).run(req.user.userId, platform, type, severity, message);
  res.status(201).json({ id: result.lastInsertRowid });
});

// DELETE /api/threats/:id
router.delete('/:id', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  db.prepare('DELETE FROM threats WHERE id = ? AND user_id = ?').run(req.params.id, req.user.userId);
  res.json({ success: true });
});

export default router;
