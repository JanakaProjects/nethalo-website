import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

// GET /api/reports
router.get('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const reports = db.prepare('SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC').all(req.user.userId);
  res.json({ reports });
});

// POST /api/reports
router.post('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { type, description, target_name } = req.body;
  if (!type) { res.status(400).json({ error: 'type required' }); return; }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO reports (user_id, type, description, target_name) VALUES (?, ?, ?, ?)'
  ).run(req.user.userId, type, description || null, target_name || null);
  res.status(201).json({ id: result.lastInsertRowid });
});

export default router;
